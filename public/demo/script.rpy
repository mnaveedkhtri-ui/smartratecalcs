# ==============================================================================
# PROJECT: SUBJECT 04 - THE ESCAPE EXPERIMENT
# Ren'Py 8 (Python 3) Script Architecture
# Lead Systems Engineer: Muhammad Naveed
# ==============================================================================

init python:
    # Game Variables
    selected_protagonist = None
    struggle_points = 0
    escape_timer = 60
    has_escape_code = False
    door_unlocked = False

# Character Definitions
define aria = Character("A.R.I.A.", color="#06b6d4", who_outlines=[(1, "#020617")])
define maya = Character("Maya", color="#ef4444", who_outlines=[(1, "#020617")])
define chloe = Character("Chloe", color="#38bdf8", who_outlines=[(1, "#020617")])

# Image Placeholders & Transitions
image bg start_facility = "images/bg_facility_chamber.png"
image bg lab_chamber = "images/bg_lab_chamber.png"
image bg gas_chamber = "images/bg_gas_containment.png"

define eye_blink = ImageDissolve("images/eye_blink_mask.png", 2.5, 8)

# ==============================================================================
# LABEL: START GAME
# ==============================================================================
label start:
    scene bg start_facility with fade
    play music "audio/ambient_facility_drone.ogg" loop

    "FACILITY 7: CONTAINMENT LOG"
    "Subject induction protocol initiated."

# ==============================================================================
# LABEL: PROTAGONIST SELECTION SCREEN
# ==============================================================================
label character_select:
    menu:
        "Select your protagonist for this experiment:"

        "Maya Carter (The Ex-Bully - High Physical Resistance, Defiant)":
            $ selected_protagonist = "maya"
            jump waking_scene

        "Chloe Vance (The Nerd - High Analytical Logic, Timid)":
            $ selected_protagonist = "chloe"
            jump waking_scene

# ==============================================================================
# LABEL: WAKING UP SEQUENCE (BLINK TRANSITION)
# ==============================================================================
label waking_scene:
    scene black
    pause 1.0

    # Blinking Eye Simulation
    scene bg lab_chamber with eye_blink
    play sound "audio/heartbeat_heavy.ogg"

    if selected_protagonist == "maya":
        maya "Ugh... my head... where the hell am I?"
        maya "What's with these straps?! I can't move my arms!"
    else:
        chloe "O-ow... my skull is throbbing... is anyone there?"
        chloe "Wait... why am I strapped to a chair?! Is this another sick campus prank?!"

    play sound "audio/intercom_static.ogg"
    aria "Subject vitals recognized. Heart rate and cortical telemetry within experimental baseline."
    aria "Welcome to Facility 7. You have been selected for human compliance evaluation."

    menu:
        "Who the hell are you?! Let me out of here!":
            aria "I am A.R.I.A. Automated Research and Intelligence Architecture."
            aria "Physical restraints are mandatory until preliminary testing commences."

        "Where am I? Please let me go!":
            aria "Location parameters are classified. Panic responses will only accelerate sedative protocols."

    aria "An enforcement officer is en route to transport you to the primary testing grid."
    aria "Estimated arrival: 60 seconds."

# ==============================================================================
# LABEL: INTERACTIVE ESCAPE QTE & TIMED ROOM EXPLORATION
# ==============================================================================
label escape_phase:
    aria "Beginning preliminary scan..."

    # Quick Time Event: Wrist Restraints
    $ struggle_points = 0
    "TAP / CLICK RAPIDLY TO BREAK FREE FROM WRIST RESTRAINTS!"

    call screen struggle_qte_screen

    play sound "audio/buckle_snap.ogg"
    "SNAP! The wrist buckles give way under intense strain!"

    if selected_protagonist == "maya":
        maya "Hah! Cheap plastic buckles. Now where's the way out of this dump?"
    else:
        chloe "I... I managed to slide the buckle pin! Okay Chloe, breathe... find the door lock!"

# ==============================================================================
# LABEL: CLIFFHANGER CONCLUSION
# ==============================================================================
label experiment_lockdown:
    play sound "audio/alarm_siren.ogg"
    aria "Containment breach detected. Automated gas release sequence engaged."
    
    scene bg gas_chamber with Dissolve(1.5)
    play sound "audio/gas_hiss.ogg"

    "A thick, sweet-smelling white aerosol pours from ceiling vents..."
    "Your vision blurs as your limbs grow heavy and unresponsive..."

    scene black with fade
    pause 2.0

    aria "Sedative delivered successfully. Subject metrics logged."
    aria "Transferring subject to Phase 2: Attire replacement and suspension testing."

    "--- END OF DEMO PROTOTYPE ---"
    "Chapter 1: The Induction is currently in active development."
    return
