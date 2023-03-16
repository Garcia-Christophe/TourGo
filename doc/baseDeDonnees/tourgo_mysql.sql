-- phpMyAdmin SQL Dump
-- version 5.1.4
-- https://www.phpmyadmin.net/
--
-- Host: mysql-tourgo.alwaysdata.net
-- Generation Time: Mar 16, 2023 at 08:36 PM
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
(9, '2023-01-21', 'jdupont'),
(10, '2022-08-28', 'jdupont'),
(11, '2022-09-02', 'jdupont'),
(12, '2022-08-25', 'jsmith'),
(13, NULL, 'jdupont'),
(14, '2022-09-02', 'scorpius'),
(15, '2022-07-15', 'ale'),
(16, '2022-08-30', 'rioDJ'),
(17, '2022-06-25', 'jsmith'),
(18, '2022-09-05', 'scorpius');

-- --------------------------------------------------------

--
-- Table structure for table `LiaisonReservationOption`
--

DROP TABLE IF EXISTS `LiaisonReservationOption`;
CREATE TABLE `LiaisonReservationOption` (
  `idReservation` int(11) NOT NULL,
  `idOption` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `LiaisonReservationOption`
--

INSERT INTO `LiaisonReservationOption` (`idReservation`, `idOption`) VALUES
(14, 10),
(14, 11),
(15, 10),
(39, 15),
(41, 16),
(41, 17);

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
(9, 'Prêt de chaussures de randonnées', 2, 13),
(10, 'Retour au départ en bus après la course', 4, 14),
(11, 'Repas sain réconfort après la course', 13, 14),
(12, 'Panier repas à manger n\'importe quand', 6, 15),
(13, 'Retour à l\'office de tourisme en bus à 01h00', 4, 15),
(14, 'Pass accès VIP (sauna, hammam, massage...)', 10, 15),
(15, 'Nuit dans une chambre (hôtel 1*)', 32, 19),
(16, 'Session autographes avec Florent Manaudou', 4, 21),
(17, 'Accès VIP au spa (sauna, hammam...)', 8, 21);

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
(14, 1, 14, 9),
(15, 1, 14, 12),
(16, 1, 14, 14),
(17, 1, 14, 15),
(18, 1, 14, 16),
(19, 6, 13, 10),
(20, 4, 13, 18),
(21, 15, 15, 10),
(22, 7, 16, 17),
(23, 20, 16, 16),
(24, 3, 16, 11),
(25, 2, 17, 11),
(26, 2, 17, 12),
(27, 2, 17, 14),
(28, 2, 17, 15),
(29, 5, 18, 17),
(30, 3, 18, 10),
(31, 3, 18, 18),
(32, 11, 19, 15),
(33, 2, 19, 17),
(34, 3, 22, 16),
(35, 2, 23, 15),
(36, 1, 25, 18),
(37, 2, 26, 10),
(38, 2, 26, 15),
(39, 5, 19, 13),
(40, 2, 24, 13),
(41, 1, 21, 13);

-- --------------------------------------------------------

--
-- Table structure for table `Sortie`
--

DROP TABLE IF EXISTS `Sortie`;
CREATE TABLE `Sortie` (
  `idSortie` int(11) NOT NULL,
  `nomSortie` varchar(50) NOT NULL,
  `descriptionSortie` varchar(1000) NOT NULL,
  `prixSortie` int(11) NOT NULL,
  `nbPlaces` int(11) NOT NULL,
  `nbInscrits` int(11) NOT NULL DEFAULT 0,
  `date` date NOT NULL,
  `heure` time NOT NULL,
  `duree` time NOT NULL,
  `lieu` varchar(100) NOT NULL,
  `image` mediumtext NOT NULL,
  `nbVues` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Sortie`
--

INSERT INTO `Sortie` (`idSortie`, `nomSortie`, `descriptionSortie`, `prixSortie`, `nbPlaces`, `nbInscrits`, `date`, `heure`, `duree`, `lieu`, `image`, `nbVues`) VALUES
(13, 'Balade en forêt', 'Paysages fantastiques et forêt légendaire.\r\n\r\nBerceau de nombreuses légendes celtes, la forêt de Huelgoat, ou  \"Fontainebleau breton\", est surtout connue pour la curiosité et la beauté de ses rochers : un amoncellement de blocs arrondis à la disposition chaotique qui inspirèrent de nombreux récits. Y serpente aussi la rivière d’Argent, domaine des fées de Huelgoat.', 5, 20, 10, '2023-08-31', '14:00:00', '03:00:00', 'Forêt de Huelgoat, 892 Rue de la Roche Tremblante, 29690 Huelgoat', 'https://img.static-rmg.be/a/view/q75/w1624/h769/3337394/foret-du-huelgoat-png.png', 29),
(14, 'La Transléonarde', 'Le Marathon du Finistère c’est le rendez-vous des sportifs à la pointe Bretonne, 42,195 km de découvertes alliant patrimoine culturel et naturel. Une date à noter dans vos agendas, un évènement qui se prépare, pour vous, par des bénévoles passionnés.\n\nNe dalv ket mont d\'ar red, gwelloc\'h eomont abred ! \nRien de sert de courir, il faut partir à point...\n\nOrganisé pour combler un vide dans notre département qui était alors dépourvu de cette course emblématique qu’est le Marathon.', 42, 600, 5, '2023-01-25', '09:00:00', '06:00:00', 'Place des 3 piliers, 29260 Lesneven', 'https://www.transleonarde.com/accueil/images/images/Page%20Photos/2019/YM2.jpg', 9),
(15, 'Soirée Plage !', 'De la baie de La Baule à la presqu’île de Guérande, de Pornic à Pornichet, venez respirer l’air marin de la côte Atlantique. Grandes plages, criques intimes, petites cités de caractères, les 130 km de la côte Atlantique offrent une grande variété de paysages. A une heure de Nantes ou en direct à Saint-Nazaire, prenez le large !', 7, 55, 15, '2023-07-25', '19:00:00', '06:00:00', 'Baie du Pouliguen', 'https://i.pinimg.com/originals/e6/29/33/e62933708c82a45fc2a7b991465d5cf0.jpg', 10),
(16, 'Soirée Disco 70’s', 'Avez-vous déjà imaginé ce que serait une soirée disco a thème des années 70 ?  Organiser un thème pour entreprise n’a rien compliqué. Nous fournissons La discomobile, les éclairages, la musique, le décor et même les accessoires de soirée pour la thématique.\n\nLes Accessoires Thématiques\nParmi les accessoires disponibles il y a les boucles d’oreille thématique, les bracelets lumineux pour la soirée, les casquettes à paillettes thématique , les chapeaux chaggy adaptés à la thématique  et les lunettes de l’époque. Le décor aux couleurs très « punché » qui rappellent les années 70’s. N’oubliez surtout pas que ces articles sont à vous.', 10, 30, 30, '2022-10-09', '20:00:00', '04:00:00', 'Mirabel, Québec J7N 0T7', 'https://lesproductionstechnomage.com/wp-content/uploads/2018/04/discomobile-technomage-2.jpg', 30),
(17, 'Festival Photo', 'Festival Photo La Gacilly\n\nQue les clichés exposés soient en noir et blanc ou en couleur, le vert est chaque année une teinte dominante du Festival Photo La Gacilly. En se consacrant à notre environnement, l’événement artistique entend bien s’enraciner durablement dans le paysage.\nPlusieurs centaines de clichés grands formats, signés par des artistes de renoms ou des chasseurs d’images amateurs. Exposé en plein air, et battant le pavé du charmant village de La Gacilly, l’ensemble ne manque pas de faire son effet. Créé en 2004 par Jacques Rocher, aujourd’hui Président de la fondation Yves Rocher, le festival entend faire réfléchir sur l’avenir de notre planète. Qu’il s’agisse des forêts millénaires, des océans ou des peuples, il y aura toujours un photographe pour montrer les dangers qui les guettent. Entre onirisme et prise de conscience, chaque année, le festival met à l’honneur cette dame nature si digne, respectable et photogénique.', 0, 35, 8, '2022-09-09', '14:00:00', '03:30:00', 'La Gacilly, 56200', 'https://crtb.cloudly.space/app/uploads/crt-bretagne/2018/09/1-festival-photo-la-gacilly-sophie-meyer-1920x960.jpg', 19),
(18, 'Puy du Fou', 'Venir au Puy du Fou, c’est la promesse de vivre des moments inoubliables, chargés d’émotions à partager en famille. Et si les foules du monde entier viennent au Puy du Fou pour vibrer et s’émouvoir, c’est qu’il est porteur de valeurs et d’émotions universelles qui touchent le cœur des visiteurs de tous les âges.', 42, 25, 11, '2022-12-04', '05:15:00', '20:00:00', 'Manoir de Charette, 85590 Les Epesses', 'https://prod-sites-pdf-webdata.s3.eu-west-1.amazonaws.com/france/files/s3fs-public/styles/common_main_image_desktop/public/shows/2017-09/Les-Vikings-1.jpg.webp?VersionId=ya1uMvNVrUk.X_bybhXg1Em2KMrX.oMg&itok=nGJPeXId', 35),
(19, 'Les Vieilles Charrues', 'Le festival des Vieilles Charrues est un festival associatif de musiques actuelles, annuel, programmé sur quatre jours le troisième weekend de juillet dans la commune de Carhaix-Plouguer, dans le Finistère (France). Le festival est souvent surnommé « les Charrues ».\r\nL’édition 2023 a pour thème la fête foraine et se déroulera sur 5 jours, avec un lundi de clôture consacré aux Red Hot Chili Peppers. 72 artistes, parmi lesquels Blur, Robbie Williams, Rosalía, Phoenix, Shaka Ponk, Soprano, Bigflo et Oli, Aya Nakamura se relaieront sur les scènes des Vieilles Charrues', 55, 70, 13, '2023-08-15', '16:30:00', '23:00:00', 'Dépendances de, Rue de Persivien, 29800 Carhaix-Plouguer', 'https://cdn.vieillescharrues.asso.fr/wp-content/uploads/2022/12/cover-1920x1080.jpg', 51),
(20, 'Brocéliande', 'La forêt de Brocéliande est une forêt mythique imaginée par Chrétien de Troyes à la fin du 12e siècle. Dans son roman arthurien le « Chevalier au lion », il invente cette forêt des merveilles en s\'inspirant d\'une forêt de petite Bretagne connue pour ses légendes et autres récits merveilleux, « Bréchéliant ».', 12, 52, 0, '2023-07-11', '09:30:00', '10:30:00', '1 place du roi Saint-Judicaël 35380 Paimpont ', 'https://static.broceliande.xyz/local/cache-vignettes/L2048xH1152/ponthus_arbre_legendaire_001-f7f9e.jpg?1649534549', 0),
(21, 'Aqualorn', 'Les 9 bassins du complexe nautique d’Aqualorn sont le théâtre de quelques 200 000 baignades par an tous publics confondus. Ce qui en fait à n’en pas douter un des équipements de loisirs les plus populaires du pays de Landerneau-Daoulas.', 8, 15, 0, '2023-08-05', '11:00:00', '05:00:00', 'Rue Saint-Ernel, 29800 Landerneau', 'https://www.pays-landerneau-daoulas.fr/medias/2015/10/Aqualorn.jpg', 21),
(22, 'Lectures pour enfants', 'Histoires et images en pagaille pour faire frissonner les plus jeunes...\r\nPour les Nuits de la lecture, viens écouter des histoires en pyjama !\r\nPetits et grands pourront découvrir ou redécouvrir, dès la tombée de la nuit, des histoires qui font (un peu) peur, sous une lumière nouvelle.', 3, 20, 3, '2023-02-10', '18:00:00', '04:00:00', 'La Minothèque, 21 Bis Rue Louis Guihot, 44130 Bouvron', 'https://cdn-s-www.vosgesmatin.fr/images/0D9DCFF8-A0FE-4B88-A434-2314FA676280/NW_raw/bien-installes-et-parfois-en-pyjama-les-enfants-ont-pris-part-a-cette-nuit-de-la-lecture-mise-sur-pied-a-la-mediatheque-1643046844.jpg', 14),
(23, 'Matin sur Patins', 'Le Rïnkla, LA patinoire du grand ouest !\r\n\r\nOuvert toute l’année au public, le Rïnkla est le lieu idéal pour vivre de très bons moments en famille ou entre amis. Profitez de nombreuses séances de loisirs, des soirées à thèmes, des animations, des séances spécialement adaptées aux plus jeunes, du village débutant ou encore venez fêter votre anniversaire. La cafétéria sera là pour vous faire passer un moment convivial autour d’une boisson chaude !\r\n\r\nVous ne le savez- peut être pas mais le Rïnkla accueille également les scolaires, les groupes de centres aérés, les entreprises et comités d’entreprises.\r\n\r\nEnfin, La patinoire héberge les clubs, Sport et patinage, les Albatros amateurs ainsi que l’équipe professionnelle des Albatros. Très spectaculaires, les matchs de hockey se déroulent de septembre à avril.\r\n\r\nAlors n’attendez plus, venez découvrir le Rïnkla.', 15, 15, 2, '2023-12-02', '09:30:00', '02:30:00', 'Place Napoléon III, 29200 Brest', 'https://static.actu.fr/uploads/2018/09/IMG_0466-960x640.jpg', 6),
(24, 'Concert Stromae', 'Après 7 ans d’absence Stromae signe enfin son grand retour !\r\n\r\nAlchimiste inné des contraires, il a trouvé la formule magique, s’autorisant à mixer pop, rap, cumbia, afro-beat et autres musiques traditionnelles.\r\n\r\nCe passionné s’est découvert un nouveau rythme, celui d’un ouvrier qui retrouve son chantier de prédilection pour un troisième album : \"Multitude\".', 62, 8, 0, '2023-10-04', '16:00:00', '09:00:00', 'ZAC d’Ar Mor, Bd du Zénith, 44800 Saint-Herblain', 'https://www.zenith-nantesmetropole.com/images/stories/manifestations/stromae_2_.jpg', 13),
(25, 'Tournoi Billard', 'BILLARD - COUPE D’EUROPE CLASSIC TEAMS\r\n\r\nAprès avoir été obligé d’annuler les 2 précédentes éditions à cause du Covid, nous sommes très heureux de vous annoncer que Douarnenez Valdys défendra sa triple couronne européenne à domicile en mars prochain !\r\nLa Coupe d’Europe Classic Teams a été créée en 2008 par la Confédération Européenne de Billard et regroupe les meilleures équipes de billard carambole aux jeux de série des plus grands championnats européens.', 17, 128, 1, '2024-01-07', '16:00:00', '06:00:00', 'Salle Jules Verne , Douarnenez', 'https://i.pinimg.com/originals/19/10/68/191068881324eda121fca8f472761555.jpg', 22),
(26, 'Feu d’artifice de Brest', 'C’est à l’occasion des traditionnelles fêtes maritimes, qu’a lieu, le 14 juillet l’un des plus beaux feux d’artifice de Bretagne. ', 0, 200, 4, '2023-07-14', '19:00:00', '05:15:00', ' 1 Rue de Kiel, 29200 Brest', 'https://lvdneng.rosselcdn.net/sites/default/files/dpistyles_v2/ena_16_9_extra_big/2019/07/14/node_613226/40401852/public/2019/07/14/B9720260664Z.1_20190714100008_000%2BGM2E2FQI7.2-0.jpg?itok=rZCgKHHk1563117769', 12);

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
('admin', '8QWYvLujQcHargVH6LkjWmDPBe1UgBaAl0TT59zdCLMf0YqHic7pWLHAgaWPNOs3BKngB0XKCtjKKOa299/vpA==', 'Go', 'Tour', '2023-03-06', 'tourgo.contact@gmail.com'),
('ale', 'Ms5EYbwA0pXgLljlSMsHkiU4RfRgf4H9AhMzW2iyemdvJm6VA7z+kkPt3s73mtFakjyDqNxTIbdgcFD3m80VuQ==', 'Sorin', 'Alexia', '2001-04-02', 'asorin@gmail.com'),
('jdupont', '4MRBWMgtsJ5Nr5wsRAFHe59RzLQZBV8p5npXL/RGXC9Kc4D/mWWIkgv4i1B14+ldxGTbgPh/rlPGPuoOWPnRLg==', 'Dupont', 'Jean', '1979-03-24', 'jean.dupont@gmail.com'),
('jsmith', 'uoBF+t0kKg/8Fy/pmxJ5DPYff8IXPcmA03G3QynqUa30m7wqlEN+/GtenSBElRC9vBbFFZdo8xR/w/wXnFs6SQ==', 'Smith', 'John', '1980-12-27', 'john.smith@gmail.com'),
('rioDJ', 'tzGtXiDToBR4qmjKT+ae6Bk7c+/sDESLfTehMZ48l9guYZiYyD4dbIHDNUL8UOQz0cztmmYpf+4CkpGMb1Ld2w==', 'Garin', 'Rio', '2017-03-01', 'garin@gmail.com'),
('scorpius', '/meYtmQkvHRbGI4LVLyRQiWgFILnDsQlPIG+idsLoCWrF8+5qGdGww2Q49d0mrGIAPtraIRXtKj20jkUdXWpSw==', 'Garcia', 'Christophe', '2001-11-07', 'cgarcia@gmail.com');

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
-- Indexes for table `LiaisonReservationOption`
--
ALTER TABLE `LiaisonReservationOption`
  ADD PRIMARY KEY (`idReservation`,`idOption`),
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
  MODIFY `idCommande` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `Option`
--
ALTER TABLE `Option`
  MODIFY `idOption` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `Reservation`
--
ALTER TABLE `Reservation`
  MODIFY `idReservation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `Sortie`
--
ALTER TABLE `Sortie`
  MODIFY `idSortie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

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
