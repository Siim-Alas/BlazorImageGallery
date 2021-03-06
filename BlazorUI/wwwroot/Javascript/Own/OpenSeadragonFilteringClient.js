﻿
// Prevent Caman from caching the canvas because without this:
// 1. We have a memory leak
// 2. Non-caman filters in between 2 camans filters get ignored.
Caman.Store.put = function () { };

window.OpenSeadragonFilteringClient = {
    clearFilters: function (parentNode) {
        var inputs = parentNode.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].defaultValue) {
                inputs[i].value = inputs[i].defaultValue;
                inputs[i].disabled = false;
            } else {
                inputs[i].checked = inputs[i].defaultChecked;
            }
        }

        window.OpenSeadragonClient.viewer.setFilterOptions(null);
        window.OpenSeadragonClient.viewer.forceRedraw();
    },
    applyFilters: function () {
        var filterOptions = {
            filters: {
                processors: []
            }
        };

        try {
            if (document.getElementById("exposureNumberInput").disabled === false) {
                var exposureValue = document.getElementById("exposureNumberInput").value;
                filterOptions.filters.processors.push(function (context, callback) {
                    Caman(context.canvas, function () {
                        this.exposure(exposureValue);
                        this.render(callback);
                    });
                });
            }
        } catch (e) { console.log(e); }
        try {
            if (document.getElementById("brightnessNumberInput").disabled === false) {
                var brightnessValue = document.getElementById("brightnessNumberInput").value;
                filterOptions.filters.processors.push(function (context, callback) {
                    Caman(context.canvas, function () {
                        this.brightness(brightnessValue);
                        this.render(callback);
                    });
                });
            }
        } catch (e) { console.log(e); }
        try {
            if (document.getElementById("contrastNumberInput").disabled === false) {
                var contrastValue = document.getElementById("contrastNumberInput").value;
                filterOptions.filters.processors.push(OpenSeadragon.Filters.CONTRAST(contrastValue));
            }
        } catch (e) { console.log(e); }
        try {
            if (document.getElementById("saturationNumberInput").disabled === false) {
                var saturationValue = document.getElementById("saturationNumberInput").value;
                filterOptions.filters.processors.push(function (context, callback) {
                    Caman(context.canvas, function () {
                        this.saturation(saturationValue);
                        this.render(callback);
                    });
                });
            }
        } catch (e) { console.log(e); }
        try {
            if (document.getElementById("vibranceNumberInput").disabled === false) {
                var vibranceValue = document.getElementById("vibranceNumberInput").value;
                filterOptions.filters.processors.push(function (context, callback) {
                    Caman(context.canvas, function () {
                        this.vibrance(vibranceValue);
                        this.render(callback);
                    });
                });
            }
        } catch (e) { console.log(e); }
        try {
            if (document.getElementById("gammaNumberInput").disabled === false) {
                var gammaValue = document.getElementById("gammaNumberInput").value;
                filterOptions.filters.processors.push(function (context, callback) {
                    Caman(context.canvas, function () {
                        this.gamma(gammaValue);
                        this.render(callback);
                    });
                });
            }
        } catch (e) { console.log(e); }
        try {
            if (document.getElementById("grayScaleInput").checked) {
                filterOptions.filters.processors.push(OpenSeadragon.Filters.GREYSCALE());
            }
        } catch (e) { console.log(e); }
        try {
            if (document.getElementById("invertInput").checked) {
                filterOptions.filters.processors.push(OpenSeadragon.Filters.INVERT());
            }
        } catch (e) { console.log(e); }

        window.OpenSeadragonClient.viewer.setFilterOptions(filterOptions);
    }
};