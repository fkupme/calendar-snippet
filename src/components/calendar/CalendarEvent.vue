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
    <v-card-item class="calendar-event__content">
      <v-card-title class="text-subtitle-2 pb-1">
        {{ formattedTitle }}
      </v-card-title>
      <v-card-subtitle class="pt-0">
        <div>{{ formattedTime }}</div>
        <div v-if="event.price">
          {{ formatPrice(event.price) }}
        </div>
      </v-card-subtitle>
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
  cursor: pointer;
  transition: all 0.2s ease;
  overflow-y: auto;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 2px;
    
    &:hover {
      background: #555;
    }
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
      border-image: linear-gradient(to right, #88CA47, #F58628) 1;
      border-top: 4px solid ;
    }

    &-closed {
      border-top: 4px solid #000;
    }

    &-whithout {
      border-top: 4px solid #939292;
    }
  }

  &__content {
    padding: 8px;
  }
}
</style>