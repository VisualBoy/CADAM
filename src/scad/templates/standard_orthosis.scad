/*
 * Standard Parametric Orthosis Template
 *
 * This template generates a standard orthotic insole based on a set of
 * foot measurements and clinical parameters.
 */

// Main module to be called with parameters
module standard_orthosis(
    // Foot Measurements (will come from scan analysis later)
    foot_length = 250,
    foot_width = 95,
    heel_width = 65,
    arch_height = 25,
    forefoot_width = 90,

    // Clinical Parameters (from UI)
    arch_support_height = 15,
    heel_cup_depth = 8,
    material_thickness = 3,

    // Conditional flags
    has_metatarsal_pad = false,
    metatarsal_pad_height = 4
) {
    difference() {
        union() {
            base_orthosis(
                foot_length,
                foot_width,
                heel_width,
                arch_height,
                forefoot_width,
                material_thickness
            );

            arch_support(
                foot_length,
                foot_width,
                arch_height,
                arch_support_height,
                material_thickness
            );

            heel_cup(
                foot_length,
                heel_width,
                heel_cup_depth,
                material_thickness
            );

            if (has_metatarsal_pad) {
                metatarsal_pad(
                    foot_length,
                    forefoot_width,
                    metatarsal_pad_height,
                    material_thickness
                );
            }
        }

        // Negative space of the foot (to be implemented later with mesh subtraction)
        // For now, we just generate the additive parts.
    }
}

// Generates the main body of the orthosis
module base_orthosis(
    length,
    width,
    heel_w,
    arch_h,
    forefoot_w,
    thickness
) {
    linear_extrude(height = thickness) {
        hull() {
            // Heel
            translate([-length / 2, 0, 0])
            circle(d = heel_w);

            // Midfoot
            translate([0, 0, 0])
            circle(d = width * 0.8);

            // Forefoot
            translate([length / 2, 0, 0])
            circle(d = forefoot_w);
        }
    }
}

// Adds medial arch support
module arch_support(length, width, arch_h, support_h, thickness) {
    translate([0, -width/4, thickness]) {
        linear_extrude(height = support_h) {
            translate([0, width/4, 0])
            resize([length * 0.4, width * 0.3, 0])
            circle(d = 1);
        }
    }
}

// Creates a cup around the heel
module heel_cup(length, heel_w, cup_depth, thickness) {
    translate([-length / 2, 0, 0]) {
        difference() {
            cylinder(h = cup_depth + thickness, d = heel_w + thickness * 2);
            translate([0, 0, thickness])
            cylinder(h = cup_depth, d = heel_w);
        }
    }
}

// Adds a metatarsal pad
module metatarsal_pad(length, forefoot_w, pad_h, thickness) {
    translate([length * 0.3, 0, thickness]) {
        linear_extrude(height = pad_h) {
            resize([forefoot_w * 0.5, forefoot_w * 0.4, 0])
            circle(d=1);
        }
    }
}

// Generate the final model
standard_orthosis();
