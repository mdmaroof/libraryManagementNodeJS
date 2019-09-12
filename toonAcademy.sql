{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww10800\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 -- phpMyAdmin SQL Dump\
-- version 4.8.3\
-- https://www.phpmyadmin.net/\
--\
-- Host: localhost:8889\
-- Generation Time: Sep 12, 2019 at 04:06 PM\
-- Server version: 5.7.23\
-- PHP Version: 7.2.8\
\
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";\
SET time_zone = "+00:00";\
\
--\
-- Database: `toonAcademy`\
--\
\
-- --------------------------------------------------------\
\
--\
-- Table structure for table `books`\
--\
\
CREATE TABLE `books` (\
  `id` int(11) NOT NULL,\
  `book_name` varchar(40) NOT NULL,\
  `class_book_related` varchar(20) NOT NULL,\
  `totalBook` int(20) DEFAULT '10'\
) ENGINE=InnoDB DEFAULT CHARSET=utf8;\
\
--\
-- Dumping data for table `books`\
--\
\
INSERT INTO `books` (`id`, `book_name`, `class_book_related`, `totalBook`) VALUES\
(1, 'Book One ', 'Class I', 7),\
(2, 'Book Two ', 'Class I', 76),\
(3, 'Book One Class II', 'Class II', 12),\
(4, 'Book Two Class II', 'Class II', 10),\
(5, 'Book One Class III', 'Class III', 26),\
(6, 'Book Two Class III', 'Class III', 1),\
(7, 'Book Three', 'Class I', 2),\
(8, 'Book Four', 'Class I', 18),\
(9, 'Book Five', 'Class I', 55);\
\
-- --------------------------------------------------------\
\
--\
-- Table structure for table `class`\
--\
\
CREATE TABLE `class` (\
  `class_id` int(11) NOT NULL,\
  `class_name` varchar(40) NOT NULL\
) ENGINE=InnoDB DEFAULT CHARSET=utf8;\
\
--\
-- Dumping data for table `class`\
--\
\
INSERT INTO `class` (`class_id`, `class_name`) VALUES\
(1, 'Class I'),\
(2, 'Class II'),\
(3, 'Class III'),\
(4, 'Class IV'),\
(5, 'Class V'),\
(6, 'Class VI'),\
(7, 'Class VII'),\
(8, 'Class VIII'),\
(9, 'Class IX'),\
(10, 'Class X'),\
(11, 'Class XI'),\
(12, 'Class XII');\
\
-- --------------------------------------------------------\
\
--\
-- Table structure for table `returnBooks`\
--\
\
CREATE TABLE `returnBooks` (\
  `id` int(11) NOT NULL,\
  `studentId` tinyint(11) NOT NULL,\
  `currentDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,\
  `fineAmount` varchar(40) NOT NULL\
) ENGINE=InnoDB DEFAULT CHARSET=utf8;\
\
--\
-- Dumping data for table `returnBooks`\
--\
\
INSERT INTO `returnBooks` (`id`, `studentId`, `currentDate`, `fineAmount`) VALUES\
(1, 11, '2019-09-12 13:46:57', '10'),\
(2, 10, '2019-09-12 13:49:42', '90'),\
(3, 12, '2019-09-12 13:52:26', '100'),\
(4, 13, '2019-09-12 14:19:07', '0');\
\
-- --------------------------------------------------------\
\
--\
-- Table structure for table `students`\
--\
\
CREATE TABLE `students` (\
  `studentId` int(11) NOT NULL,\
  `studentName` varchar(40) NOT NULL,\
  `className` varchar(40) NOT NULL,\
  `fromDate` date NOT NULL,\
  `toDate` date NOT NULL,\
  `returnBook` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0 = No, 1= Yes'\
) ENGINE=InnoDB DEFAULT CHARSET=utf8;\
\
--\
-- Dumping data for table `students`\
--\
\
INSERT INTO `students` (`studentId`, `studentName`, `className`, `fromDate`, `toDate`, `returnBook`) VALUES\
(10, 'sss', 'Class I', '2019-09-01', '2019-09-03', 1),\
(11, 'Maroof', 'Class III', '2019-09-01', '2019-09-11', 1),\
(12, 'ssssssss', 'Class III', '2019-09-03', '2019-09-02', 1),\
(13, 'Mohd Maroof ', 'Class II', '2019-09-12', '2019-09-24', 1);\
\
-- --------------------------------------------------------\
\
--\
-- Table structure for table `student_books`\
--\
\
CREATE TABLE `student_books` (\
  `student_id` int(11) NOT NULL,\
  `book_id` int(11) NOT NULL\
) ENGINE=InnoDB DEFAULT CHARSET=utf8;\
\
--\
-- Dumping data for table `student_books`\
--\
\
INSERT INTO `student_books` (`student_id`, `book_id`) VALUES\
(10, 1),\
(10, 2),\
(10, 7),\
(10, 8),\
(10, 9),\
(11, 5),\
(11, 6),\
(12, 5),\
(13, 4);\
\
--\
-- Indexes for dumped tables\
--\
\
--\
-- Indexes for table `books`\
--\
ALTER TABLE `books`\
  ADD PRIMARY KEY (`id`),\
  ADD KEY `book_name` (`book_name`) USING BTREE,\
  ADD KEY `class_book_related` (`class_book_related`);\
\
--\
-- Indexes for table `class`\
--\
ALTER TABLE `class`\
  ADD PRIMARY KEY (`class_id`),\
  ADD UNIQUE KEY `class_id` (`class_id`);\
\
--\
-- Indexes for table `returnBooks`\
--\
ALTER TABLE `returnBooks`\
  ADD PRIMARY KEY (`id`);\
\
--\
-- Indexes for table `students`\
--\
ALTER TABLE `students`\
  ADD PRIMARY KEY (`studentId`),\
  ADD KEY `studentName` (`studentName`),\
  ADD KEY `className` (`className`),\
  ADD KEY `toDate` (`toDate`),\
  ADD KEY `fromDate` (`fromDate`) USING BTREE;\
\
--\
-- Indexes for table `student_books`\
--\
ALTER TABLE `student_books`\
  ADD KEY `student_id` (`student_id`),\
  ADD KEY `book_id` (`book_id`);\
\
--\
-- AUTO_INCREMENT for dumped tables\
--\
\
--\
-- AUTO_INCREMENT for table `books`\
--\
ALTER TABLE `books`\
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;\
\
--\
-- AUTO_INCREMENT for table `class`\
--\
ALTER TABLE `class`\
  MODIFY `class_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;\
\
--\
-- AUTO_INCREMENT for table `returnBooks`\
--\
ALTER TABLE `returnBooks`\
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;\
\
--\
-- AUTO_INCREMENT for table `students`\
--\
ALTER TABLE `students`\
  MODIFY `studentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;\
}