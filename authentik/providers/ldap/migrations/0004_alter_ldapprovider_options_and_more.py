# Generated by Django 5.0.7 on 2024-07-25 14:59
from django.apps.registry import Apps

from django.db.backends.base.schema import BaseDatabaseSchemaEditor

from django.db import migrations
from django.contrib.auth.management import create_permissions


def migrate_search_group(apps: Apps, schema_editor: BaseDatabaseSchemaEditor):
    from guardian.shortcuts import assign_perm
    from authentik.core.models import User
    from django.apps import apps as real_apps

    db_alias = schema_editor.connection.alias

    # Permissions are only created _after_ migrations are run
    # - https://github.com/django/django/blob/43cdfa8b20e567a801b7d0a09ec67ddd062d5ea4/django/contrib/auth/apps.py#L19
    # - https://stackoverflow.com/a/72029063/1870445
    create_permissions(real_apps.get_app_config("authentik_providers_ldap"), using=db_alias)

    LDAPProvider = apps.get_model("authentik_providers_ldap", "ldapprovider")

    for provider in LDAPProvider.objects.using(db_alias).all():
        for user_pk in (
            provider.search_group.users.using(db_alias).all().values_list("pk", flat=True)
        ):
            # We need the correct user model instance to assign the permission
            assign_perm(
                "search_full_directory", User.objects.using(db_alias).get(pk=user_pk), provider
            )


class Migration(migrations.Migration):

    dependencies = [
        ("authentik_providers_ldap", "0003_ldapprovider_mfa_support_and_more"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="ldapprovider",
            options={
                "permissions": [("search_full_directory", "Search full LDAP directory")],
                "verbose_name": "LDAP Provider",
                "verbose_name_plural": "LDAP Providers",
            },
        ),
        migrations.RunPython(migrate_search_group),
        migrations.RemoveField(
            model_name="ldapprovider",
            name="search_group",
        ),
    ]
