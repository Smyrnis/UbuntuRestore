/**
 * state.js
 * Single source of truth for all user selections.
 */

const state = {
  // System
  sysUpdate:     true,
  sysDeps:       true,

  // PHP
  phpVersions:   [],
  phpExtensions: ['mysql', 'curl', 'gd', 'mbstring', 'xml', 'zip', 'intl'],

  // Categories
  dbs:           [],
  langs:         [],
  webserver:     'None',
  dbtools:       [],
  editors:       [],
  ides:          [],
  vcs:           [],
  browsers:      [],
  containers:    [],
  cloud:         [],
  cli:           [],
  devtools:      [],
  networking:    [],
  security:      [],
  aiml:          [],
  apps:          [],
  media:         [],
  graphics:      [],
  fonts:         [],
  gnome:         [],
};
