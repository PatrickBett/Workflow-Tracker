from django.db import models
from django.utils import timezone
import uuid


class Application(models.Model):

    class ApplicationType(models.TextChoices):
        RECORDATION = "Recordation", "Recordation"
        RENEWAL = "Renewal", "Renewal"
        CHANGE_OWNERSHIP = "Change of Ownership", "Change of Ownership"
        CHANGE_NAME = "Change of Name", "Change of Name"
        DISCONTINUATION = "Discontinuation", "Discontinuation"

    class Status(models.TextChoices):
        DRAFT = "Draft", "Draft"
        SUBMITTED = "Submitted", "Submitted"
        UNDER_REVIEW = "Under Review", "Under Review"
        NEED_MORE_INFO = "Need More Information", "Need More Information"
        APPROVED = "Approved", "Approved"
        REJECTED = "Rejected", "Rejected"

    tracking_number = models.CharField(
        max_length=50,
        unique=True,
        editable=False
    )

    applicant_name = models.CharField(max_length=255)

    applicant_email = models.EmailField()

    company_name = models.CharField(max_length=255)

    application_type = models.CharField(
        max_length=50,
        choices=ApplicationType.choices
    )

    description = models.TextField()

    status = models.CharField(
        max_length=30,
        choices=Status.choices,
        default=Status.DRAFT
    )

    reviewer_comment = models.TextField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    submitted_at = models.DateTimeField(
        blank=True,
        null=True
    )

    reviewed_at = models.DateTimeField(
        blank=True,
        null=True
    )

    def save(self, *args, **kwargs):

        if not self.tracking_number:
            self.tracking_number = (
                f"APP-{uuid.uuid4().hex[:8].upper()}"
            )

        super().save(*args, **kwargs)

    def __str__(self):
        return self.tracking_number