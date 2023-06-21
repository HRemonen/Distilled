import datetime
import re

from marshmallow import Schema, fields, validate, validates, ValidationError


class URLValidator:
    def __call__(self, value):
        if value:
            pattern = re.compile(
                r"^(?:http|ftp)s?://"  # http:// or https://
                # domain...
                r"(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|"
                r"localhost|"  # localhost...
                r"\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|"  # ...or IPv4
                r"\[?[A-F0-9]*:[A-F0-9:]+\]?)"  # ...or IPv6
                r"(?::\d+)?"  # optional port
                r"(?:/?|[/?]\S+)$",
                re.IGNORECASE,
            )
            if not re.match(pattern, value):
                raise ValidationError("Invalid URL format")
        return value


class NewDistillerySchema(Schema):
    name = fields.String(required=True)
    location = fields.Tuple((fields.Float(), fields.Float()), required=True)
    country = fields.String(required=True)
    year_established = fields.Integer(
        required=True, validate=validate.Range(min=0, max=datetime.datetime.now().year)
    )
    website = fields.String(validate=URLValidator())

    @validates("website")
    def validate_url(self, value):
        if value and not value.startswith("http"):
            raise ValidationError("URL must start with 'http'")


class UpdatedDistillerySchema(Schema):
    name = fields.String(required=True)
    location = fields.Tuple((fields.Float(), fields.Float()), required=True)
    country = fields.String(required=True)
    year_established = fields.Integer(
        required=True, validate=validate.Range(min=0, max=datetime.datetime.now().year)
    )
    website = fields.String(validate=URLValidator())

    @validates("website")
    def validate_url(self, value):
        if value and not value.startswith("http"):
            raise ValidationError("URL must start with 'http'")
