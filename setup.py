#!/usr/bin/env python

from subprocess import check_call, CalledProcessError

from setuptools import setup, find_packages


def convert_readme():
    try:
        check_call(["pandoc", "-f", "markdown_github", "-t",
                    "rst", "-o", "README.rst", "README.md"])
    except (OSError, CalledProcessError):
        return open('README.md').read()

    return open('README.rst').read()

setup(
    name='django-mongoengine-forms',
    version='0.4.1.8',
    description="An implementation of django forms using mongoengine.",
    author='Thom Wiggers',
    author_email='thom@thomwiggers.nl',
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
        "mongodbforms": ['templates/mongodbforms/*', 'static/mongodbforms/*']
    },
    provides=['mongodbforms'],
    obsoletes=['mongodbforms'],
    url='https://github.com/thomwiggers/django-mongoengine-forms/',
    zip_safe=False,
    install_requires=['setuptools', 'django>=1.8', 'mongoengine>=0.8.8'],
    test_suite="tests",
)
