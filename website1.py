from bottle import route, run, static_file, template, request, redirect
import os
import sqlite3

@route('/')
def main():
    return template('<b>Hello world!</b>!')

# runs the full website
run(host='localhost', port=8000, debug=True)
