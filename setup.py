#!/usr/bin/env python

from setuptools import setup, find_packages
from subprocess import call

def convert_readme():
    try:
        call(["pandoc", "-f", "markdown_github", "-t",  "rst", "-o",  "README.txt", "readme.md"])
    except Exception:
        # If `pandoc` is not available
        pass
    return open('README.txt').read()

setup(name='mongodbforms',
    version='0.3',
    description="An implementation of django forms using mongoengine.",
    author='Jan Schrewe',
    author_email='jan@schafproductions.com',
    url='http://www.schafproductions.com/projects/django-mongodb-forms/',
    packages=find_packages(),
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Environment :: Web Environment',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: BSD License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Framework :: Django',
    ],
    license='New BSD License',
    long_description=convert_readme(),
    include_package_data=True,
    package_data={
        "mongodbforms": ['templates/mongodbforms/*']
    },
    zip_safe=False,
    install_requires=['setuptools', 'django>=1.4', 'mongoengine>=0.8.3',],
)
