jquery-kojax
============

Very early in development and subject to change.

Alternative to PJAX that does requireJS and other nice things.

A little more involved than PJAX, however the idea is to allow the response
to control a lot more about what happens on the page.

Instead of just returning HTML, an XHTML document should be returned like so:

    <kojax>
        <jquery selector="body" function="attr">
            <arg>class</arg>
            <arg>newpage</arg>
        </jquery>
        <block selector="#main">
            <h1>Oh look, some new content</h1>
            <p>Isn't that great?</p>
        </block>
    </kojax>

Which will be picked up and parsed by jQuery's DOM parser and then translated
into doing things.