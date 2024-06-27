$(document).ready(function() {
    // Función para cargar los registros existentes
    function loadPersons() {
        $.ajax({
            url: 'read.php',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                let rows = '';
                $.each(data, function(index, person) {
                    rows += `<tr>
                                <td>${person.id}</td>
                                <td>${person.doce_nombre}</td>
                                <td>${person.doce_apellido}</td>
                                <td>${person.per_cumple}</td>
                                <td>${person.per_mail}</td>
                                <td>${person.doce_cel}</td>
                                <td>
                                    <button class="editButton btn btn-sm btn-primary" data-id="${person.id}">Editar</button>
                                    <button class="deleteButton btn btn-sm btn-danger" data-id="${person.id}">Eliminar</button>
                                </td>
                             </tr>`;
                });
                $('#personTable tbody').html(rows);
            }
        });
    }

    // Cargar registros al inicio
    loadPersons();

    // Función para guardar un registro
    $('#saveButton').on('click', function(event) {
        event.preventDefault();
        let form = $('#personForm')[0];
        if (form.checkValidity() === false) {
            event.stopPropagation();
            $(form).addClass('was-validated');
            return;
        }
        $(form).removeClass('was-validated');

        let id = $('#id').val();
        let url = id ? 'update.php' : 'create.php';
        let method = id ? 'PUT' : 'POST';

        $.ajax({
            url: url,
            type: method,
            contentType: 'application/json',
            data: JSON.stringify({
                id: id,
                doce_nombre: $('#doce_nombre').val(),
                doce_apellido: $('#doce_apellido').val(),
                per_cumple: $('#per_cumple').val(),
                per_mail: $('#per_mail').val(),
                doce_cel: $('#doce_cel').val()
            }),
            success: function(response) {
                if (response.status === 'success') {
                    alert('Registro guardado correctamente');
                    $('#personForm')[0].reset();
                    $('#personForm input[type="hidden"]').val('');
                    loadPersons();
                } else {
                    alert('Error: ' + response.message);
                }
            }
        });
    });

    // Función para editar un registro
    $(document).on('click', '.editButton', function() {
        let id = $(this).data('id');

        $.ajax({
            url: 'read.php',
            type: 'GET',
            data: { id: id },
            dataType: 'json',
            success: function(person) {
                $('#id').val(person.id);
                $('#doce_nombre').val(person.doce_nombre);
                $('#doce_apellido').val(person.doce_apellido);
                $('#per_cumple').val(person.per_cumple);
                $('#per_mail').val(person.per_mail);
                $('#doce_cel').val(person.doce_cel);
            }
        });
    });

    // Función para eliminar un registro
    $(document).on('click', '.deleteButton', function() {
        let id = $(this).data('id');

        if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
            $.ajax({
                url: 'delete.php',
                type: 'GET',
                data: { id: id },
                success: function(response) {
                    if (response.status === 'success') {
                        alert('Registro eliminado correctamente');
                        loadPersons();
                    } else {
                        alert('Error: ' + response.message);
                    }
                }
            });
        }
    });
});
