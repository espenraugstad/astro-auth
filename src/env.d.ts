/// <reference types="astro/client" />
declare namespace App {
	interface Locals {
		data: {
            user: User;
            session: Session;
        } | {
            user: null;
            session: null;
        };
	}
}