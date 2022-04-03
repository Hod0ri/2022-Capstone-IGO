from re import M
from django.contrib import admin
from .models import Member, UpdatePoint, HireDriver, HireCustomer

admin.site.register(Member)
admin.site.register(UpdatePoint)
admin.site.register(HireDriver)
admin.site.register(HireCustomer)