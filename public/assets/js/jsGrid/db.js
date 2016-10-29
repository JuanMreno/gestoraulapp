(function() {

    var db = {

        loadData: function(filter) {
            return $.grep(this.clients, function(client) {
                return (!filter.Practica || client.Practica.indexOf(filter.Practica) > -1)
                    && (!filter.Unidad || client.Unidad.indexOf(filter.Unidad) > -1)
                    && (!filter.Fecha || client.Fecha.indexOf(filter.Fecha) > -1)
                    && (filter.Estado === undefined || client.Estado === filter.Estado);
            });
        },

        insertItem: function(insertingClient) {
            this.clients.push(insertingClient);
        },

        updateItem: function(updatingClient) { },

        deleteItem: function(deletingClient) {
            var clientIndex = $.inArray(deletingClient, this.clients);
            this.clients.splice(clientIndex, 1);
        }

    };

    window.db = db;

    db.clients = [
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Extensiometria y transductores", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Péndulo balístico", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Medida de la potencia de pedaleao", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Movimieto bajo fuerzas centrales", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Osciloscopio", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Ciclo de histeresis", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Campo magnetico terrestre", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Magnetico-Conductor", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Acciones entre corrientes", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Extensiometria y transductores", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Péndulo balístico", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Medida de la potencia de pedaleao", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Movimieto bajo fuerzas centrales", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Osciloscopio", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Ciclo de histeresis", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Campo magnetico terrestre", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Magnetico-Conductor", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Acciones entre corrientes", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Extensiometria y transductores", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Péndulo balístico", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Medida de la potencia de pedaleao", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Movimieto bajo fuerzas centrales", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Osciloscopio", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Ciclo de histeresis", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Campo magnetico terrestre", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Magnetico-Conductor", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Acciones entre corrientes", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Extensiometria y transductores", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Péndulo balístico", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Medida de la potencia de pedaleao", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Movimieto bajo fuerzas centrales", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Osciloscopio", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Ciclo de histeresis", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Campo magnetico terrestre", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Magnetico-Conductor", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Acciones entre corrientes", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Extensiometria y transductores", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Péndulo balístico", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Medida de la potencia de pedaleao", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Movimieto bajo fuerzas centrales", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Osciloscopio", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Ciclo de histeresis", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Campo magnetico terrestre", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Magnetico-Conductor", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Acciones entre corrientes", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Extensiometria y transductores", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Péndulo balístico", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Medida de la potencia de pedaleao", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Movimieto bajo fuerzas centrales", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Osciloscopio", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Ciclo de histeresis", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Campo magnetico terrestre", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Magnetico-Conductor", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Acciones entre corrientes", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Extensiometria y transductores", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Péndulo balístico", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Medida de la potencia de pedaleao", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Movimieto bajo fuerzas centrales", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Osciloscopio", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Ciclo de histeresis", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Campo magnetico terrestre", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Magnetico-Conductor", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Acciones entre corrientes", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Extensiometria y transductores", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Péndulo balístico", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Medida de la potencia de pedaleao", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Movimieto bajo fuerzas centrales", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Osciloscopio", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Ciclo de histeresis", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Campo magnetico terrestre", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Magnetico-Conductor", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Acciones entre corrientes", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Extensiometria y transductores", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Péndulo balístico", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Medida de la potencia de pedaleao", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Movimieto bajo fuerzas centrales", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Osciloscopio", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Ciclo de histeresis", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Campo magnetico terrestre", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Magnetico-Conductor", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Acciones entre corrientes", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Extensiometria y transductores", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Péndulo balístico", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Medida de la potencia de pedaleao", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Movimieto bajo fuerzas centrales", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Osciloscopio", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Ciclo de histeresis", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Campo magnetico terrestre", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Magnetico-Conductor", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Acciones entre corrientes", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Extensiometria y transductores", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Péndulo balístico", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Medida de la potencia de pedaleao", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Movimieto bajo fuerzas centrales", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Osciloscopio", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Ciclo de histeresis", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Campo magnetico terrestre", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Magnetico-Conductor", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Acciones entre corrientes", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Extensiometria y transductores", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Péndulo balístico", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Medida de la potencia de pedaleao", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Movimieto bajo fuerzas centrales", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Osciloscopio", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Ciclo de histeresis", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Campo magnetico terrestre", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Magnetico-Conductor", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Acciones entre corrientes", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Extensiometria y transductores", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Péndulo balístico", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Medida de la potencia de pedaleao", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Movimieto bajo fuerzas centrales", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Osciloscopio", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Acciones entre corrientes", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica" : "Campos magnéticos", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." }
    ];

    /////////////////       ESTUDIANTES     /////////////////////////////////////////////////////
    var dbEst = {

        loadData: function(filter) {
            return $.grep(this.practs, function(client) {
                return (!filter.Estudiante || client.Estudiante.indexOf(filter.Estudiante) > -1)
                    && (!filter.Fecha || client.Fecha.indexOf(filter.Fecha) > -1)
                    && (filter.Estado === undefined || client.Estado === filter.Estado)
                    && (!filter.N_PROFESOR || client.N_PROFESOR.indexOf(filter.N_PROFESOR) > -1)
                    && (!filter.N_APP || client.N_APP.indexOf(filter.N_APP) > -1)
                    && (!filter.N_FINAL || client.N_FINAL.indexOf(filter.N_FINAL) > -1);
            });
        },

        insertItem: function(insertingClient) {
            this.practs.push(insertingClient);
        },

        updateItem: function(updatingClient) { },

        deleteItem: function(deletingClient) {
            var clientIndex = $.inArray(deletingClient, this.practs);
            this.practs.splice(clientIndex, 1);
        }

    };

    window.dbEst = dbEst;

    dbEst.practs = [
        { "Id":1, "Estudiante":"Juan Moreno", "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Estudiante":"Juan Moreno", "Practica": "Extensiometria y transductores", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Estudiante":"Juan Moreno", "Practica" : "Péndulo balístico", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Estudiante":"Juan Moreno", "Practica" : "Medida de la potencia de pedaleao", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Estudiante":"Juan Moreno", "Practica" : "Movimieto bajo fuerzas centrales", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Estudiante":"Juan Moreno", "Practica" : "Osciloscopio", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Estudiante":"Juan Moreno", "Practica" : "Ciclo de histeresis", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Estudiante":"Juan Moreno", "Practica" : "Campo magnetico terrestre", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Estudiante":"Juan Moreno", "Practica" : "Magnetico-Conductor", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": false, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Estudiante":"Juan Moreno", "Practica" : "Acciones entre corrientes", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Estudiante":"Juan Moreno", "Practica" : "Campos magnéticos", "Unidad": "Electromagnetismo", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." }
    ];

    ////////////////////////    RANKING     /////////////////////////////////////////////////////////////////////////////////
    var dbRan = {

        loadData: function(filter) {
            return $.grep(this.est, function(client) {
                return (!filter.Estudiante || client.Estudiante.indexOf(filter.Estudiante) > -1)
                    && (!filter.Grupo || client.Grupo.indexOf(filter.Grupo) > -1)
                    && (!filter.Nota || client.Nota.indexOf(filter.Nota) > -1)
                    && (!filter.Practicas || client.Practicas.indexOf(filter.Practicas) > -1)
                    && (!filter.Tiempo || client.Tiempo.indexOf(filter.Tiempo) > -1);
            });
        },

        insertItem: function(insertingClient) {
            this.est.push(insertingClient);
        },

        updateItem: function(updatingClient) { },

        deleteItem: function(deletingClient) {
            var clientIndex = $.inArray(deletingClient, this.est);
            this.est.splice(clientIndex, 1);
        }

    };

    window.dbRan = dbRan;

    dbRan.est = [
        { "Id":1, "Estudiante":"Juan Moreno", "Grupo": "11-A", "Nota":"2.5", "Practicas":"5", "Tiempo":"2 Días" },
        { "Id":1, "Estudiante":"Juan Moreno", "Grupo": "11-A", "Nota":"2.5", "Practicas":"5", "Tiempo":"2 Días" },
        { "Id":1, "Estudiante":"Juan Moreno", "Grupo": "11-A", "Nota":"2.5", "Practicas":"5", "Tiempo":"2 Días" },
        { "Id":1, "Estudiante":"Juan Moreno", "Grupo": "11-A", "Nota":"2.5", "Practicas":"5", "Tiempo":"2 Días" },
        { "Id":1, "Estudiante":"Juan Moreno", "Grupo": "11-A", "Nota":"2.5", "Practicas":"5", "Tiempo":"2 Días" },
        { "Id":1, "Estudiante":"Juan Moreno", "Grupo": "11-A", "Nota":"2.5", "Practicas":"5", "Tiempo":"2 Días" },
        { "Id":1, "Estudiante":"Juan Moreno", "Grupo": "11-A", "Nota":"2.5", "Practicas":"5", "Tiempo":"2 Días" },
        { "Id":1, "Estudiante":"Juan Moreno", "Grupo": "11-A", "Nota":"2.5", "Practicas":"5", "Tiempo":"2 Días" },
        { "Id":1, "Estudiante":"Juan Moreno", "Grupo": "11-A", "Nota":"2.5", "Practicas":"5", "Tiempo":"2 Días" },
        { "Id":1, "Estudiante":"Juan Moreno", "Grupo": "11-A", "Nota":"2.5", "Practicas":"5", "Tiempo":"2 Días" },
        { "Id":1, "Estudiante":"Juan Moreno", "Grupo": "11-A", "Nota":"2.5", "Practicas":"5", "Tiempo":"2 Días" },
        { "Id":1, "Estudiante":"Juan Moreno", "Grupo": "11-A", "Nota":"2.5", "Practicas":"5", "Tiempo":"2 Días" },
        { "Id":1, "Estudiante":"Juan Moreno", "Grupo": "11-A", "Nota":"2.5", "Practicas":"5", "Tiempo":"2 Días" },
        { "Id":1, "Estudiante":"Juan Moreno", "Grupo": "11-A", "Nota":"2.5", "Practicas":"5", "Tiempo":"2 Días" },
        { "Id":1, "Estudiante":"Juan Moreno", "Grupo": "11-A", "Nota":"2.5", "Practicas":"5", "Tiempo":"2 Días" },
        { "Id":1, "Estudiante":"Juan Moreno", "Grupo": "11-A", "Nota":"2.5", "Practicas":"5", "Tiempo":"2 Días" }
    ];

    ////////////////////////    ANUNCIOS     /////////////////////////////////////////////////////////////////////////////////
    var dbAnun = {

        loadData: function(filter) {
            return $.grep(this.dbAnun, function(client) {
                return (!filter.Titulo || client.Titulo.indexOf(filter.Titulo) > -1)
                    && (!filter.Profesor || client.Profesor.indexOf(filter.Profesor) > -1)
                    && (!filter.Contenido || client.Contenido.indexOf(filter.Contenido) > -1)
                    && (!filter.Fecha || client.Fecha.indexOf(filter.Fecha) > -1)
            });
        },

        insertItem: function(insertingClient) {
            this.dbAnun.push(insertingClient);
        },

        updateItem: function(updatingClient) { },

        deleteItem: function(deletingClient) {
            var clientIndex = $.inArray(deletingClient, this.dbAnun);
            this.dbAnun.splice(clientIndex, 1);
        }

    };

    window.dbAnun = dbAnun;

    dbAnun.dbAnun = [
        { "Id":1, "Profesor":"Oscar Moreno", "Titulo":"Quiz próxima semana", "Contenido": "El día viernes se realizará un quiz del último tema visto.", "Fecha":"12/11/2015" },
        { "Id":1, "Profesor":"Oscar Moreno", "Titulo":"Quiz próxima semana", "Contenido": "El día viernes se realizará un quiz del último tema visto.", "Fecha":"12/11/2015" },
        { "Id":1, "Profesor":"Oscar Moreno", "Titulo":"Quiz próxima semana", "Contenido": "El día viernes se realizará un quiz del último tema visto.", "Fecha":"12/11/2015" },
        { "Id":1, "Profesor":"Oscar Moreno", "Titulo":"Quiz próxima semana", "Contenido": "El día viernes se realizará un quiz del último tema visto.", "Fecha":"12/11/2015" },
        { "Id":1, "Profesor":"Oscar Moreno", "Titulo":"Quiz próxima semana", "Contenido": "El día viernes se realizará un quiz del último tema visto.", "Fecha":"12/11/2015" },
        { "Id":1, "Profesor":"Oscar Moreno", "Titulo":"Quiz próxima semana", "Contenido": "El día viernes se realizará un quiz del último tema visto.", "Fecha":"12/11/2015" },
        { "Id":1, "Profesor":"Oscar Moreno", "Titulo":"Quiz próxima semana", "Contenido": "El día viernes se realizará un quiz del último tema visto.", "Fecha":"12/11/2015" },
        { "Id":1, "Profesor":"Oscar Moreno", "Titulo":"Quiz próxima semana", "Contenido": "El día viernes se realizará un quiz del último tema visto.", "Fecha":"12/11/2015" },
        { "Id":1, "Profesor":"Oscar Moreno", "Titulo":"Quiz próxima semana", "Contenido": "El día viernes se realizará un quiz del último tema visto.", "Fecha":"12/11/2015" },
        { "Id":1, "Profesor":"Oscar Moreno", "Titulo":"Quiz próxima semana", "Contenido": "El día viernes se realizará un quiz del último tema visto.", "Fecha":"12/11/2015" }
    ];

    /////////////////////////   PRACTICAS   ////////////////////////////////////////////////
    var dbPracs = {

        loadData: function(filter) {
            return $.grep(this.clients, function(client) {
                return (!filter.Practica || client.Practica.indexOf(filter.Practica) > -1)
                    && (!filter.Fecha || client.Fecha.indexOf(filter.Fecha) > -1)
                    && (filter.Estado === undefined || client.Estado === filter.Estado)
                    && (!filter.Entrega || client.Entrega.indexOf(filter.Entrega) > -1)
                    && (!filter.Intentos || client.Intentos.indexOf(filter.Intentos) > -1)
                    && (!filter.N_PROFESOR || client.N_PROFESOR.indexOf(filter.N_PROFESOR) > -1)
                    && (!filter.N_APP || client.N_APP.indexOf(filter.N_APP) > -1)
                    && (!filter.N_FINAL || client.N_FINAL.indexOf(filter.N_FINAL) > -1)
            });
        },

        insertItem: function(insertingClient) {
            this.data.push(insertingClient);
        },

        updateItem: function(updatingClient) { },

        deleteItem: function(deletingClient) {
            var clientIndex = $.inArray(deletingClient, this.data);
            this.data.splice(clientIndex, 1);
        }

    };

    window.dbPracs = dbPracs;

    dbPracs.data = [
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "Intentos":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "Intentos":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "Intentos":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "Intentos":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "Intentos":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "Intentos":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "Intentos":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "Intentos":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "Intentos":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "Intentos":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "Intentos":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "Intentos":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "Intentos":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "Intentos":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "Intentos":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "Intentos":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "Intentos":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "Intentos":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "Intentos":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "Intentos":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "Intentos":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "Intentos":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "Intentos":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "Intentos":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "Intentos":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "Intentos":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." },
        { "Id":1, "Practica": "Ondas estacionárias", "Unidad": "Mecánica clásica", "Fecha": "25/10/2016", "Estado": true, "Entrega":2, "Intentos":2, "N_PROFESOR":"3.5", "N_APP":"4.5", "N_FINAL":"4", "OBSRV":"Conclusiones acertadas y coherentes." }
    ];

}());