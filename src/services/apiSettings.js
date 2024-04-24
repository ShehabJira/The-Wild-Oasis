import supabase from "./supabase";

export async function getSettings() {
	const { data, error } = await supabase.from("settings").select("*").single();

	if (error) {
		console.error(error);
		throw new Error("Settings could not be loaded");
	}
	return data;
	// return data[0] is like single()
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
	// here we don't need an id, as we only have 1 row in settings.
	const { data, error } = await supabase
		.from("settings")
		.update(newSetting)
		// There is only ONE row of settings, and it has the ID=1, and so this is the updated one
		.eq("id", 1)
		.single();

	if (error) {
		console.error(error);
		throw new Error("Settings could not be updated");
	}
	return data;
}
