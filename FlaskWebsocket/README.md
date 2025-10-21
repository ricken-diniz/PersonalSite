### How to run in production

````
gunicorn -w 1 app:app
````

If you need, adjuste the config in gunicorn.conf.py


To run in terminal:

```
python3 -m main.py
```
