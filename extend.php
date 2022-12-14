<?php

/*
 * This file is part of fof/upload.
 *
 * Copyright (c) FriendsOfFlarum.
 * Copyright (c) Flagrow.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */


use Flarum\Extend;

return [

    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js'),
   (new Extend\Locales(__DIR__.'/resources/locale')),
];