--create database PhoneShop

use PhoneShop
go

	create table Product(
	productID int identity(1,1) primary key,
	stock int not null,
	name nvarchar (200) not null unique,
	favorite int not null  check (favorite in (1,0)),
	brand varchar(100) not null,
	price float	not null,
	category varchar(100) not null,
	sale nvarchar(100) ,
	description nvarchar(max)
	)

go 
create table Rating(
ratingID int identity(1,1) primary key,
_5star	int ,
_4star	int,
_3star	int,
_2star	int,
_1star	int,
productID int constraint FK_Rating references Product(productID)
)
go 
create table Users(
userID	int identity(1,1) primary key,
userName varchar(max) not null,
password varchar(max) not null,
auth	int not null check (auth in (1,0)), --	1 - admin   0 -	user
email varchar(max) not null
)
go

create table Subimg (
subimgID int identity(1,1) primary key,
url varchar(max) not null,
alt varchar(100) not null,
productID int constraint FK_SrcImg references product(productID)
)
go 

create table Cart(
cartID int identity(1,1) primary key,
userID int not null constraint FK_Cart references Users(userID) unique
)
create table Cart_Product (
cartID int ,
productID int,
amount int,
primary key (cartID,productID)
)
go 
alter table Cart_Product add  constraint FK_Cart_Product_Cart foreign key (cartID)  references Cart(cartID)
go
alter table Cart_Product add  constraint FK_Cart_Product_Product foreign key (productID)  references Product(productID)
go
 create table Feature(
 featureID int identity (1,1) primary key,
feature nvarchar(max) not null,
productID int constraint FK_Feature_Product  references Product(productID)
 )
go 
