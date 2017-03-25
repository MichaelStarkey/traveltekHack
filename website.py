from bottle import route, run, static_file, template, request, redirect
import os
import sqlite3

@route('/')
def main():
    return template('<b>Hello world!</b>!')

# runs the full website
run(host='0.0.0.0', port=80, debug=True)
