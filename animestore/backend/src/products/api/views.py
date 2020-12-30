from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from products.models import Item, Cart
from .serializers import ItemSerializer, CartSerializer
from rest_framework.generics import RetrieveAPIView, CreateAPIView
from rest_framework import viewsets
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.shortcuts import get_object_or_404
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404


class ItemAPIView(generics.ListCreateAPIView):
    search_fields = ['category']
    filter_backends = (filters.SearchFilter,)
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    lookup_field = 'slug'

class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer


class AddToCartView(generics.ListCreateAPIView):
    def post(self, request, *args, **kwargs):
        slug = request.data.get('slug', None)
        if slug is None:
            return Response({"message": "Invalid request"}, status=HTTP_400_BAD_REQUEST)

        item = get_object_or_404(Item, slug=slug)
        Cart.objects.create(user=request.user, item=item, qty=1)
        return Response(status=HTTP_200_OK)


class CartDetailView(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        try:
            print(self.request.user)
            order = Cart.objects.filter(user=self.request.user)
            return order
            
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")



    
