CREATE TABLE `caixinhas` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`nome` varchar(255) NOT NULL,
	`descricao` text,
	`saldo` decimal(15,2) NOT NULL DEFAULT '0',
	`tipo` enum('poupanca','investimento','emergencia','meta') NOT NULL DEFAULT 'poupanca',
	`rendimentoMensal` decimal(10,2) DEFAULT '0',
	`ultimoRendimento` timestamp,
	`metaValor` decimal(15,2),
	`ativa` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `caixinhas_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `configuracoes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`hasSeenOnboarding` boolean NOT NULL DEFAULT false,
	`tutorialStepDashboard` boolean NOT NULL DEFAULT false,
	`tutorialStepTurnos` boolean NOT NULL DEFAULT false,
	`tutorialStepCaixinhas` boolean NOT NULL DEFAULT false,
	`notificacoesAtivas` boolean NOT NULL DEFAULT true,
	`temaEscuro` boolean NOT NULL DEFAULT false,
	`metaDiariaValor` decimal(10,2) DEFAULT '100',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `configuracoes_id` PRIMARY KEY(`id`),
	CONSTRAINT `configuracoes_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `contas` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`banco` varchar(255) NOT NULL,
	`agencia` varchar(10),
	`conta` varchar(20),
	`tipo` enum('corrente','poupanca') NOT NULL DEFAULT 'corrente',
	`titular` varchar(255) NOT NULL,
	`cpf` varchar(11),
	`ativa` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contas_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ganhosDiarios` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`data` timestamp NOT NULL,
	`ganhoTotal` decimal(10,2) NOT NULL DEFAULT '0',
	`gastoTotal` decimal(10,2) NOT NULL DEFAULT '0',
	`quilometrosTotal` decimal(10,2) NOT NULL DEFAULT '0',
	`horariosAtivos` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ganhosDiarios_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscricoes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`plano` enum('free','premium') NOT NULL DEFAULT 'free',
	`valor` decimal(10,2) DEFAULT '9.99',
	`dataInicio` timestamp NOT NULL,
	`dataFim` timestamp,
	`ativa` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `subscricoes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `transacoesCaixinhas` (
	`id` int AUTO_INCREMENT NOT NULL,
	`caixinhaId` int NOT NULL,
	`tipo` enum('deposito','saque','rendimento') NOT NULL,
	`valor` decimal(15,2) NOT NULL,
	`descricao` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `transacoesCaixinhas_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `turnos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`dataInicio` timestamp NOT NULL,
	`dataFim` timestamp,
	`quilometrosRodados` decimal(10,2) DEFAULT '0',
	`ganhoTurno` decimal(10,2) DEFAULT '0',
	`gastosCombustivel` decimal(10,2) DEFAULT '0',
	`status` enum('ativo','finalizado') NOT NULL DEFAULT 'ativo',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `turnos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `isPro` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `birthDate` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD `profilePicture` text;