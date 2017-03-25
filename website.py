from bottle import route, run, static_file, template, request, redirect
import os
import sqlite3

@route('/')
def main():
    return template('header.tpl')

#static file-path, allows for adding more scripts / styles later
@route('/static/<type>/<filename>')
def server_static(type, filename):
    return static_file(filename, root='static/'+type)

# runs the full website
run(host='localhost', port='8080', debug=True)
