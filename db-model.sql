-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema hackerBay
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema hackerBay
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `hackerBay` DEFAULT CHARACTER SET utf8 ;
USE `hackerBay` ;

-- -----------------------------------------------------
-- Table `hackerBay`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hackerBay`.`users` (
  `uname` VARCHAR(45) NOT NULL,
  `pwd` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`uname`),
  UNIQUE INDEX `uname_UNIQUE` (`uname` ASC))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
