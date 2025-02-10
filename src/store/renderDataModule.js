import useImageUrl from "@/utils/useImageUrl";

 const renderDataModule = {
    state: {
        studioCards: [
          {
          id: 1,
          title: "Music Loft Rehearsal",
          subtitle: "Traditional",
          value: "music-loft-rehearsal",
          avatar: useImageUrl(".././assets/images/calendar-panel-dropdown-avatar.png"),
        },
        {
          id: 2,
          title: "New School Studio",
          subtitle: "New School",
          value: "new-school-studio",
          avatar: useImageUrl(".././assets/images/calendar-panel-dropdown-avatar.png"),
        },
        {
          id: 3,
          title: "Bio Music Lab",
          subtitle: "Bio",
          value: "bio-music-lab",
          avatar: useImageUrl(".././assets/images/calendar-panel-dropdown-avatar.png"),
        },
        {
          id: 4,
          title: "Trash Sound Space",
          subtitle: "Trash",
          value: "trash-sound-space",
          avatar: useImageUrl(".././assets/images/calendar-panel-dropdown-avatar.png"),
        },
        {
          id: 5,
          title: "Oriental Melody Room",
          subtitle: "Oriental",
          value: "oriental-melody-room",
          avatar: useImageUrl(".././assets/images/calendar-panel-dropdown-avatar.png"),
        },
        {
          id: 6,
          title: "All Studios",
          subtitle: "All",
          value: "all-studios",
          avatar: useImageUrl(".././assets/images/calendar-panel-dropdown-avatar.png"),
        },
      ],
    },
    namespaced: true,
};

export default renderDataModule;