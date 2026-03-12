export const MemoryButtonTypes = {
    MC: "MC",  // Memory Clear
    MR: "MR",  // Memory Recall
    MP: "M+",  // Memory Plus
    MM: "M-",  // Memory Minus
    MS: "MS",  // Memory Store
    MV: "Mv",  // Memory View
} as const;

export type MemoryButtonType = typeof MemoryButtonTypes[keyof typeof MemoryButtonTypes];

export const MemoryButtonStates = {
    enabled: "enabled",
    disabled: "disabled",
} as const;

export type MemoryButtonState = typeof MemoryButtonStates[keyof typeof MemoryButtonStates];
