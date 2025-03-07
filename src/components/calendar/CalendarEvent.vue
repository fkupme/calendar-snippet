<template>
  <v-card
    :class="[
      'calendar-event',
      `calendar-event_mode-${mode}`,
      `calendar-event_status-${event.status}`,
      { 'calendar-event_selected': isSelected }
    ]"
    elevation="2"
    variant="flat"
    @click="handleClick"
  >
    <v-card-item class="calendar-event-text ">
      <v-card-title class="calendar-event-text__title fs-12">
        {{ formattedTitle }}
      </v-card-title>
        <div class='calendar-event-text__time fs-9 text-secondary'>{{ formattedTime }}</div>
        <div class='calendar-event-text__price fs-10' v-if="event.price">
          {{ formatPrice(event.price) }}
        </div>
        <div class="icons-panel">
          <v-icon class="icon" size="12" color="primary">mdi-cellphone</v-icon>
          <v-icon class="icon" size="12" color="primary">mdi-plus-circle-outline</v-icon>
         <v-icon class="icon" size="12" color="primary">mdi-message-outline</v-icon>
        </div>
    </v-card-item>
  </v-card>
</template>

<script setup>
import { computed } from 'vue';
import { useDateFormat } from '@vueuse/core';
import { useStore } from 'vuex';

const props = defineProps({
  event: {
    type: Object,
    required: true
  },
  mode: {
    type: String,
    default: 'day',
    validator: (value) => ['day', 'week', 'month'].includes(value)
  },
  showCategory: {
    type: Boolean,
    default: false
  }
});

const store = useStore();

const categoryMap = {
  'music-loft-rehearsal': 'Traditional',
  'new-school-studio': 'New School',
  'bio-music-lab': 'Bio',
  'trash-sound-space': 'Trash',
  'oriental-melody-room': 'Oriental'
};

const formattedTitle = computed(() => {
  if (!props.showCategory) return props.event.title;
  return `[${categoryMap[props.event.category]}] ${props.event.title}`;
});

const formattedTime = computed(() => {
  const startTime = useDateFormat(new Date(props.event.start), 'HH:mm');
  const endTime = useDateFormat(new Date(props.event.end), 'HH:mm');
  return `${startTime.value}-${endTime.value}`;
});

const isSelected = computed(() => {
  return props.event.id === store.state.calendar.redactingEvent;
});

const handleClick = () => {
  store.commit('calendar/SET_REDACTING_EVENT', props.event.id);
};

const formatPrice = (price) => {
  return `${price}₽`;
};
</script>

<style lang="scss" scoped>
.calendar-event {
  height: 100%;
  min-height: 56px;
  position: relative;
  z-index: 2;
  cursor: pointer;
  transition: all 0.2s ease;
  overflow-y: hidden;
  &-text{
    line-height: 1;
    padding: 5px 0 5px 8px;
    &_title {
      line-height: 1;
    }

  }

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &_selected {
    border: 1.5px solid #4680D6 !important;
    border-top: 4px solid #4680D6 !important;
		border-image: none !important;
  }


  &_status {
    &-reserved {
      border-top: 4px solid #F58628;
    }

    &-paid {
      border-top: 4px solid #88CA47;
    }

    &-paid_partially {
     border-image:  linear-gradient(to right, #88CA47, #F58628) 1;
      border-top: 4px solid ;
    }

    &-closed {
      border-top: 4px solid #000;
    }

    &-without {
      border-top: 4px solid #939292;
    }
  }

  &__content {
    padding: 8px;
  }
}
</style>