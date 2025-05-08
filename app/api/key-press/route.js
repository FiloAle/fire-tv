import { NextResponse } from 'next/server';
import { exec } from 'child_process';

export async function POST(req) {
	const body = await req.json();
	const key = body.key;

	if (!key || typeof key !== 'string') {
		return NextResponse.json({ error: 'Key not valid' }, { status: 400 });
	}

	const escapedKey = key.replace(/"/g, '\\"');

	return new Promise((resolve) => {
		exec(
			`osascript -e 'tell application "System Events" to keystroke "${escapedKey}"'`,
			(error) => {
				if (error) {
					console.error(error);
					return resolve(
						NextResponse.json(
							{ error: 'Error during the keystroke simulation' },
							{ status: 500 }
						)
					);
				}

				resolve(NextResponse.json({ success: true, key }));
			}
		);
	});
}
