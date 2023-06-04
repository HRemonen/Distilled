from datetime import date

from marshmallow import Schema, fields, validate

class NewUserSchema(Schema):
    username = fields.Str(required=True, validate=validate.Length(min=3))
    password = fields.Str(required=True, validate=validate.Length(min=8))
    passwordConfirm = fields.Str(required=True, validate=validate.Equal(password))
    role = fields.Str(validate=validate.OneOf(["user", "vendor", "admin"]))

