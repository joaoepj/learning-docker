#!/usr/bin/octave -qf
x = 0:0.01:3
hf = figure()
plot(x, x.^2)
print(hf, "my-plot", "-dcanvas")
