from bottle import route, run, static_file, template, request, redirect
import os
import sqlite3

@route('/')
def main():
    return template('<b>Hello world!</b>!')

# runs the full website
run(host='54.229.193.202', port=80, debug=True)
