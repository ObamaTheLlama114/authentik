"""email stage models"""
from django.core.mail.backends.smtp import EmailBackend
from django.db import models
from django.utils.translation import gettext as _

from passbook.flows.models import Stage


class EmailStage(Stage):
    """email stage"""

    host = models.TextField(default="localhost")
    port = models.IntegerField(default=25)
    username = models.TextField(default="", blank=True)
    password = models.TextField(default="", blank=True)
    use_tls = models.BooleanField(default=False)
    use_ssl = models.BooleanField(default=False)
    timeout = models.IntegerField(default=10)

    token_expiry = models.IntegerField(
        default=30, help_text=_("Time in minutes the token sent is valid.")
    )

    from_address = models.EmailField(default="system@passbook.local")

    type = "passbook.stages.email.stage.EmailStageView"
    form = "passbook.stages.email.forms.EmailStageForm"

    @property
    def backend(self) -> EmailBackend:
        """Get fully configured EMail Backend instance"""
        return EmailBackend(
            host=self.host,
            port=self.port,
            username=self.username,
            password=self.password,
            use_tls=self.use_tls,
            use_ssl=self.use_ssl,
            timeout=self.timeout,
        )

    def __str__(self):
        return f"Email Stage {self.name}"

    class Meta:

        verbose_name = _("Email Stage")
        verbose_name_plural = _("Email Stages")
