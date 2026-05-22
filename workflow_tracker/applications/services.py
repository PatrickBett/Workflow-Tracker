from django.utils import timezone
from .models import Application


class WorkflowError(Exception):
    pass


def submit_application(application):

    if application.status not in [
        Application.Status.DRAFT,
        Application.Status.NEED_MORE_INFO
    ]:
        raise WorkflowError(
            "Only draft or need more information applications can be submitted."
        )

    application.status = Application.Status.SUBMITTED
    application.submitted_at = timezone.now()

    application.save()


def start_review(application):

    if application.status != Application.Status.SUBMITTED:
        raise WorkflowError(
            "Only submitted applications can move to review."
        )

    application.status = Application.Status.UNDER_REVIEW

    application.save()


def reviewer_decision(application, decision, comment=""):

    if application.status != Application.Status.UNDER_REVIEW:
        raise WorkflowError(
            "Application must be under review."
        )

    if decision in [
        Application.Status.NEED_MORE_INFO,
        Application.Status.REJECTED
    ] and not comment:
        raise WorkflowError(
            "Comment is required."
        )

    application.status = decision

    application.reviewer_comment = comment

    application.reviewed_at = timezone.now()

    application.save()