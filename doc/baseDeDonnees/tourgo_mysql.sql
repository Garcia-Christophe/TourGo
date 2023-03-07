-- phpMyAdmin SQL Dump
-- version 5.1.4
-- https://www.phpmyadmin.net/
--
-- Host: mysql-tourgo.alwaysdata.net
-- Generation Time: Mar 07, 2023 at 01:14 PM
-- Server version: 10.6.11-MariaDB
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tourgo_mysql`
--

-- --------------------------------------------------------

--
-- Table structure for table `Commande`
--

DROP TABLE IF EXISTS `Commande`;
CREATE TABLE `Commande` (
  `idCommande` int(11) NOT NULL,
  `dateCommande` date DEFAULT NULL,
  `pseudoUtilisateur` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Commande`
--

INSERT INTO `Commande` (`idCommande`, `dateCommande`, `pseudoUtilisateur`) VALUES
(1, '2023-01-25', 'dumby'),
(2, NULL, 'dumby');

-- --------------------------------------------------------

--
-- Table structure for table `Dog`
--

DROP TABLE IF EXISTS `Dog`;
CREATE TABLE `Dog` (
  `Id` bigint(20) NOT NULL,
  `birthDate` date DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `race` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dog`
--

DROP TABLE IF EXISTS `dog`;
CREATE TABLE `dog` (
  `id` bigint(20) NOT NULL,
  `birth_date` date DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `race` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dog`
--

INSERT INTO `dog` (`id`, `birth_date`, `name`, `race`) VALUES
(1, '2023-03-01', 'Rio', 'Berger australien');

-- --------------------------------------------------------

--
-- Table structure for table `LiaisonReservationOption`
--

DROP TABLE IF EXISTS `LiaisonReservationOption`;
CREATE TABLE `LiaisonReservationOption` (
  `idLiaison` int(11) NOT NULL,
  `idReservation` int(11) NOT NULL,
  `idOption` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `LiaisonReservationOption`
--

INSERT INTO `LiaisonReservationOption` (`idLiaison`, `idReservation`, `idOption`) VALUES
(1, 3, 2),
(2, 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `Option`
--

DROP TABLE IF EXISTS `Option`;
CREATE TABLE `Option` (
  `idOption` int(11) NOT NULL,
  `nomOption` varchar(100) NOT NULL,
  `prixOption` int(11) NOT NULL,
  `idSortie` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Option`
--

INSERT INTO `Option` (`idOption`, `nomOption`, `prixOption`, `idSortie`) VALUES
(1, 'Navette Arrivée -> Départ après la course.', 2, 2),
(2, 'Pique-nique (toute la nourriture est préparée).', 4, 3),
(3, 'Visite guidée des serres tropicales.', 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `Reservation`
--

DROP TABLE IF EXISTS `Reservation`;
CREATE TABLE `Reservation` (
  `idReservation` int(11) NOT NULL,
  `nbPersonnes` int(11) NOT NULL,
  `idSortie` int(11) NOT NULL,
  `idCommande` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Reservation`
--

INSERT INTO `Reservation` (`idReservation`, `nbPersonnes`, `idSortie`, `idCommande`) VALUES
(1, 2, 1, 1),
(2, 1, 2, 2),
(3, 5, 3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `Sortie`
--

DROP TABLE IF EXISTS `Sortie`;
CREATE TABLE `Sortie` (
  `idSortie` int(11) NOT NULL,
  `nomSortie` varchar(100) NOT NULL,
  `prixSortie` int(11) NOT NULL,
  `nbPlaces` int(11) NOT NULL,
  `nbInscrits` int(11) NOT NULL DEFAULT 0,
  `date` date NOT NULL,
  `heure` time NOT NULL,
  `duree` time NOT NULL,
  `lieu` varchar(50) NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `nbVues` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Sortie`
--

INSERT INTO `Sortie` (`idSortie`, `nomSortie`, `prixSortie`, `nbPlaces`, `nbInscrits`, `date`, `heure`, `duree`, `lieu`, `image`, `nbVues`) VALUES
(1, 'Journée au Puy du Fou', 42, 50, 0, '2023-03-01', '06:00:00', '17:00:00', 'Parc d\'attractions aux Épesses', 'https://www.chausseliere.com/wp-content/uploads/2018/01/puy-du-fou-2.gif', 0),
(2, 'Marathon La Transléonarde', 35, 600, 0, '2023-06-25', '08:00:00', '08:00:00', 'Complexe sportif de Guisseny', 'https://www.transleonarde.com/accueil/images/images/Cartes_des_Epreuves/Trace_marathon_2019.jpg', 0),
(3, 'Balade au Jardin du Conservatoire Botanique National de Brest (visite guidée)', 5, 20, 0, '2023-07-14', '10:30:00', '05:30:00', 'Rpe de Stangalard, 29200 Brest', 'https://www.marinasbrest.fr/wp-content/uploads/2022/01/Jardin-conservatoire-Brest-metropole-1.jpeg', 0);

-- --------------------------------------------------------

--
-- Table structure for table `Utilisateur`
--

DROP TABLE IF EXISTS `Utilisateur`;
CREATE TABLE `Utilisateur` (
  `pseudo` varchar(20) NOT NULL,
  `mdp` varchar(500) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `dateNaissance` date DEFAULT NULL,
  `mail` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Utilisateur`
--

INSERT INTO `Utilisateur` (`pseudo`, `mdp`, `nom`, `prenom`, `dateNaissance`, `mail`) VALUES
('admin', 'h7aXpGTyIYCmm8GJgurARIUd/5X+7MQ3DuY4Xs9cE1WuUJ12EJyZHhR5Pykfr9ZKK8wADaxbhjJ2MIH2bz4wlA==', 'TourGo', 'Administrateur', NULL, NULL),
('dumby', 'dumby123', 'Albus', 'Dumbledore', '1881-07-01', 'albus.dumbledore@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Commande`
--
ALTER TABLE `Commande`
  ADD PRIMARY KEY (`idCommande`),
  ADD KEY `fk_commande_utilisateur` (`pseudoUtilisateur`);

--
-- Indexes for table `Dog`
--
ALTER TABLE `Dog`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `dog`
--
ALTER TABLE `dog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `LiaisonReservationOption`
--
ALTER TABLE `LiaisonReservationOption`
  ADD PRIMARY KEY (`idLiaison`),
  ADD KEY `fk_liaison_reservation` (`idReservation`),
  ADD KEY `fk_liaison_option` (`idOption`);

--
-- Indexes for table `Option`
--
ALTER TABLE `Option`
  ADD PRIMARY KEY (`idOption`),
  ADD KEY `fk_option_sortie` (`idSortie`);

--
-- Indexes for table `Reservation`
--
ALTER TABLE `Reservation`
  ADD PRIMARY KEY (`idReservation`),
  ADD KEY `fk_reservation_sortie` (`idSortie`),
  ADD KEY `fk_reservation_commande` (`idCommande`);

--
-- Indexes for table `Sortie`
--
ALTER TABLE `Sortie`
  ADD PRIMARY KEY (`idSortie`);

--
-- Indexes for table `Utilisateur`
--
ALTER TABLE `Utilisateur`
  ADD PRIMARY KEY (`pseudo`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Commande`
--
ALTER TABLE `Commande`
  MODIFY `idCommande` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Dog`
--
ALTER TABLE `Dog`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dog`
--
ALTER TABLE `dog`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `LiaisonReservationOption`
--
ALTER TABLE `LiaisonReservationOption`
  MODIFY `idLiaison` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Option`
--
ALTER TABLE `Option`
  MODIFY `idOption` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Reservation`
--
ALTER TABLE `Reservation`
  MODIFY `idReservation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Sortie`
--
ALTER TABLE `Sortie`
  MODIFY `idSortie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Commande`
--
ALTER TABLE `Commande`
  ADD CONSTRAINT `fk_commande_utilisateur` FOREIGN KEY (`pseudoUtilisateur`) REFERENCES `Utilisateur` (`pseudo`);

--
-- Constraints for table `LiaisonReservationOption`
--
ALTER TABLE `LiaisonReservationOption`
  ADD CONSTRAINT `fk_liaison_option` FOREIGN KEY (`idOption`) REFERENCES `Option` (`idOption`),
  ADD CONSTRAINT `fk_liaison_reservation` FOREIGN KEY (`idReservation`) REFERENCES `Reservation` (`idReservation`);

--
-- Constraints for table `Option`
--
ALTER TABLE `Option`
  ADD CONSTRAINT `fk_option_sortie` FOREIGN KEY (`idSortie`) REFERENCES `Sortie` (`idSortie`);

--
-- Constraints for table `Reservation`
--
ALTER TABLE `Reservation`
  ADD CONSTRAINT `fk_reservation_commande` FOREIGN KEY (`idCommande`) REFERENCES `Commande` (`idCommande`),
  ADD CONSTRAINT `fk_reservation_sortie` FOREIGN KEY (`idSortie`) REFERENCES `Sortie` (`idSortie`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
