from rest_framework.permissions import BasePermission


class IsDonor(BasePermission):
    """
    Allows access only to donors.
    """

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == "DONOR"
        )


class IsNGO(BasePermission):
    """
    Allows access only to NGOs.
    """

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == "NGO"
        )


class IsAdmin(BasePermission):
    """
    Allows access only to admins.
    """

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == "ADMIN"
        )