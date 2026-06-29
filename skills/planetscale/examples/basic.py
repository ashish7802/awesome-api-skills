import mysql.connector
# Note: Python typically uses TCP connections to PlanetScale
cnx = mysql.connector.connect(user='user', password='pw', host='host', database='db')