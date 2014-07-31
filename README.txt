OSP Screenshot Tool
===================

This little tool is used to make screenshots of web pages from the command line.
Its specificity, is that it adds a browser window around the screenshot in the
right proportions, showing the site’s title and address just like in a
regular browser.

Of course one can create such a screenshot directly with the OS’ built-in
screenshot function, but in many cases it is more interesting to have a
larger sized or portrait oriented screenshot.

Usage:

phantomjs shot.js http://osp.kitchen/tools/screenshot/ screenshot_test.png 1000px*2000px

For a 1000 wide by 2000 high screenshot of the tool’s homepage.

In the future it should also be possible to make a PDF version, as the
underlying phantomjs software is already able to do so.

Known bugs
----------

The current version of PhantomJS (1.9) has problems with rendering webfonts.
The new version 2.0 based on a new version of Webkit will probably solve these.

Acknowledgments
---------------

The script is based on Phantom.js’ example script ‘rasterize.js’ and is distributed
under the same license (BSD)

- - -

Dependencies
------------

This program requires PhantomJS http://phantomjs.org/download.html

The easiest way to install this program is probably to download the binaries,
unzip them in a folder called `src`, and create symbolic links to their
executables from a location your terminal can find.

The last step might go something like this:

    mkdir -p ~/bin/
    cd ~/bin/
    ln -s ~/src/phantomjs-1.9.7-linux-x86_64/bin/phantomjs
    source ~/.profile

( The names of the folders depend on the specific version you download )

Homebrew users can do:

    brew install phantomjs

License
-------

BSD License, see LICENSE.BSD.
