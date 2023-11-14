<h1 align="center"> PhoneBook: a Tokopedia exam </h1> <br>
<p align="center">
  <a href="https://phone-book-beige.vercel.app/">
    <img alt="phoneBook" title="GitPoint" src="https://i.imgur.com/WMmWLBO.png" width="450">
  </a>
</p>

<p align="center">
 Phonebook everywhere. Built with Vite + React Typescript + emotionjs + Graphql + React testing library. The link to the web app is <a href="https://phone-book-beige.vercel.app/">here</a> or click the big phone book image above.
</p>
<p>Template by 
  <a href="https://github.com/gitpoint">
    GitPoint
  </a>
</p>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Flow](#flow)
- [Validation](#validation)
- [Contributors](#contributors)
- [Build Process](#build-process)
- [Acknowledgments](#acknowledgments)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

A Phonebook for everyone, everyone can create, delete, favorite, update the phonebook and access it from everywhere. One of the best phonebook to be used.

## Features

Features of PhoneBook:

- View contact list
- View contact details
- Favorite contact
- Unfavorite contact
- Delete contact
- Update contact
- Search contact
- Enter name to login
- Easily logout
- Mobile and Desktop ready!

## Flow

1. User enter the name (validation: only alphabets cannot be empty)
2. User will be navigate to the home page (logged in)
3. User can search by first name on the search bar
4. User can add contact by clicking the blue button with plus sign
5. User can remove contact by clicking the red icon button
6. User can update contact by clicing the blue icon button

## Validation

1. Firstname
   Cannot be empty, numbers only, no length validation
2. Lastname
   Cannot be empty, alphabets only, no length validation
3. Phone number
   Cannot be empty, start with 08, number only, no length validation

## Contributors

This project follows the ReactJS + Typescript best practices and made by Jackbloo

## Build Process

- Clone or download the repo
- `npm install` to install dependencies
- `npm run dev` to run the web-app
- `npm run test` to start the jest testing without coverage
- `npm run test:coverage` to start the jest testing with coverage (current is 88%)

## Acknowledgments

Thanks to ReactJS, Typescript, EmotionJS, Redux, Graphql, React-toastify
