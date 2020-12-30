from django.db import models
from django.contrib.auth.models import User

CATEGORY_CHOICES = (
    ('BG', 'Badge'),
    ('PR', 'Poster'),
    ('KC', 'Keychain'),
    ('PN', 'Pen'),
    ('LK', 'Locket')
)

class Item(models.Model):
    title = models.CharField(max_length=100)
    price = models.FloatField()
    category = models.CharField(choices=CATEGORY_CHOICES, max_length=2)
    description = models.TextField()
    qty = models.IntegerField(default=0)
    slug = models.SlugField(unique=True)
    image = models.ImageField(upload_to='items/%Y/%m/%d', blank=True, null=True)
    
    def __unicode__(self):
        return self.title

    class Meta:
        unique_together = ('title', 'slug')    
    
    def __str__(self):
        return self.title

    '''
    def get_absolute_url(self):
        return "items/%s/" %(self.slug)
    '''

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    qty = models.IntegerField()

    def __str__(self):
        return self.item.title


