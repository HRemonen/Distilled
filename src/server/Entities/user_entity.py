from datetime import date

from marshmallow import Schema, fields, validates_schema, validate, ValidationError

class NewUserSchema(Schema):
    username = fields.String(required=True, validate=validate.Length(min=3))
    password = fields.String(required=True, validate=validate.Length(min=8))
    passwordConfirm = fields.String(required=True)
    role = fields.String(validate=validate.OneOf(["user", "vendor", "admin"]))

    @validates_schema
    def validate_numbers(self, data, **kwargs):
        if data["password"] != data["passwordConfirm"]:
            raise ValidationError("Passwords must match")
