# Generated by Django 3.1.3 on 2020-11-21 16:27

import autoslug.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0003_auto_20201121_2123'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='slug',
            field=autoslug.fields.AutoSlugField(editable=False, populate_from=('title',), unique=True),
        ),
    ]