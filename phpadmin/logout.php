<?php

session_start();
unset ($SESSION['username']);
session_destroy();

header('Location: http://crustaceankeys.uca.es/taxonomic-tree.html');

?>