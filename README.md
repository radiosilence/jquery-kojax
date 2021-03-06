jquery-kojax
============

![](http://i.imgur.com/8Vdz9.jpg)

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

TODO: Reference which blocks do stuff.


How to use it?
--------------

### Client side

    $.kojaxBind('nav a');

Seriously. Most of the behaviour is controlled server-side.

You can also call `$.kojax` directly like so:

    $.kojax('/some-url');


### Server Side

Essentially, kojax works by using the Accept and Content-Type headers. If you
take a look at the request log, you can see that the HTTP header 
`Accept: application/x-kojax` is being set. The response must also set the
header `Content-Type: application/x-kojax` for the client side code to know
that the response is a valid kojax response. If any other content type is set,
the page will be loaded as norma.


#### Django

I will also be creating a re-usable Django app that provides a nice API.
