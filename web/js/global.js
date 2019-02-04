
function addCopyHandler(id_button, id_text_field)
{
	try
	{
		var btn = document.querySelector('#' + id_button);

		if (btn !== null)
		{
			btn.addEventListener('click', function()
			{
				var text = document.querySelector('#' + id_text_field);

				if (text !== null)
				{
					text.select();
					document.execCommand('copy');
				}
			}, false);
		}
	}
	catch (e)
	{
		// ...
	}
}

function addFileChangeHandler(id_file, id_label)
{
	try
	{
		var file_input = document.querySelector('#' + id_file);
		var label = document.querySelector('#' + id_label);

		if (file_input !== null && label !== null)
		{
			file_input.addEventListener('change', function(e)
			{
				var filename = e.target.value.split( '\\' ).pop();
				if (filename)
				{
					label.innerHTML = filename;
				}
			});
		}
	}
	catch (e)
	{
		// ...
	}
}