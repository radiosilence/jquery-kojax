jquery-kojax
============

*Very early in development and subject to change.*

An alternative to PJAX that has the goal of allowing the server-side request
to control a lot more about what is changed on the page, and do simple jQuery
calls.

Instead of just returning HTML, an XHTML document should be returned like so:

    <kojax>
    <title>A Fantastic Page</title>
        <jquery selector="body" function="attr">
            <arg>class</arg>
            <arg>fantastic</arg>
        </jquery>
        <block selector="#main">
            <h1>Oh look, some new content</h1>
            <p>Isn't that great?</p>
        </block>
    </kojax>

Which will be picked up and parsed by jQuery's DOM parser and then translated
into doing things.

How to use it?

    $.kojaxBind('nav a');

Django
------

I will also be creating a re-usable Django app that provides nice tools to
simply working with kojax.