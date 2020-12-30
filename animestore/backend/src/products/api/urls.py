from django.urls import path, include
from products.api.views import ItemViewSet, CartViewSet
#from products.api import views
from rest_framework.routers import DefaultRouter
#from rest_framework.routers import SimpleRouter
from .views import ItemAPIView, AddToCartView, CartDetailView


router = DefaultRouter()
#router = SimpleRouter()
#router.register(r'user', UserViewSet, basename='user')
#router.register(r'create', api_create_cart, basename='createcart')
router.register(r'order-summary', CartDetailView, basename='cart-details') # to add, create and delete the cart
router.register(r'cart', CartViewSet, basename='carts') # to add, create and delete the cart
router.register(r'', ItemViewSet, basename='items')
#router.register(r'cart', CartViewSet, basename='carts')


urlpatterns = [
    #path('user', CurrentUserView.as_view()),
    path('add-to-cart/', AddToCartView.as_view()),
    #path('order-summary/', CartDetailView.as_view()), #to view user specific cart
    path('', ItemAPIView.as_view()),
    path('', include(router.urls)),
]


'''
ItemAPIView.as_view() is used for filter and it is imported from .views because
it also has .as_view() w it and it's path is only put in urlpatterns unlike
ItemViewSet which is used for all listview, create, update, delete and single
item view (RetrieveView) and it is imported by giving reference of each folder
and it's url is used by using router.urls.
''' 

