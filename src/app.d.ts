/// <reference types="@sveltejs/kit" />

import type { APIUser } from "discord-api-types/v10";

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	interface Locals {
		user: APIUser
	}
}
declare module '@env' {
	export const PUBLIC_DISCORD_AUTH_URI: string;

	// other ones
}