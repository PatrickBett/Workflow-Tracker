from ninja import Router
from django.shortcuts import get_object_or_404

from .models import Application

from .schemas import (
    ApplicationCreateSchema,
    ApplicationUpdateSchema,
    ReviewerDecisionSchema,
    ApplicationOutSchema,
)

from .services import (
    submit_application,
    start_review,
    reviewer_decision,
    WorkflowError,
)

router = Router()
@router.post("/", response=ApplicationOutSchema)
def create_application(
    request,
    payload: ApplicationCreateSchema
):

    application = Application.objects.create(
        **payload.dict()
    )

    return application

@router.get("/", response=list[ApplicationOutSchema])
def list_applications(request):

    return Application.objects.all().order_by("-created_at")

@router.get("/{application_id}", response=ApplicationOutSchema)
def application_detail(request, application_id: int):

    application = get_object_or_404(
        Application,
        id=application_id
    )

    return application

@router.put("/{application_id}", response=ApplicationOutSchema)
def update_application(
    request,
    application_id: int,
    payload: ApplicationUpdateSchema
):

    application = get_object_or_404(
        Application,
        id=application_id
    )

    if application.status not in [
        Application.Status.DRAFT,
        Application.Status.NEED_MORE_INFO
    ]:
        return 400, {
            "error": "Application cannot be edited"
        }

    for attr, value in payload.dict(
        exclude_unset=True
    ).items():

        setattr(application, attr, value)

    application.save()

    return application

@router.post("/{application_id}/submit")
def submit(request, application_id: int):

    application = get_object_or_404(
        Application,
        id=application_id
    )

    try:

        submit_application(application)

        return {
            "message": "Application submitted successfully"
        }

    except WorkflowError as e:

        return 400, {
            "error": str(e)
        }
    
@router.post("/{application_id}/start-review")
def start_review_endpoint(request, application_id: int):

    application = get_object_or_404(
        Application,
        id=application_id
    )

    try:

        start_review(application)

        return {
            "message": "Application moved to review"
        }

    except WorkflowError as e:

        return 400, {
            "error": str(e)
        }
    
@router.post("/{application_id}/decision")
def decision_endpoint(
    request,
    application_id: int,
    payload: ReviewerDecisionSchema
):

    application = get_object_or_404(
        Application,
        id=application_id
    )

    try:

        reviewer_decision(
            application,
            payload.decision,
            payload.comment
        )

        return {
            "message": "Decision recorded"
        }

    except WorkflowError as e:

        return 400, {
            "error": str(e)
        }