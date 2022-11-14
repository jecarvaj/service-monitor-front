<script setup>
import { useServiceStore } from '@/stores/service'

const agents = useServiceStore().agents
const roles = ['Dev/Ops', 'Software Engineer', 'Security Agent']
</script>

<template>
  <link rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css"
    integrity="sha256-nwNjrH7J9zS/Ti4twtWX7OsC5QdQHCIKTv5cLMsGo68=" crossorigin="anonymous" />


  <div class="row">
    <div v-for="agent in agents" class="col-md-4 col-12 mt-2 pt-2">
      <div class="position-relative overflow-hidden shadow rounded text-center"
        :style="{ borderTop: 10 + 'px solid', borderTopColor: agent['color'] }">
        <img :src="'https://joeschmoe.io/api/v1/' + agent['id']" class="img-fluid" alt="" width="120">
        <div class="content float-right p-1">
          <h5 class="title mb-0">{{ agent['first_name'] }} {{ agent['last_name'] }}</h5>
          <small class="text-muted">{{ roles[Math.floor(Math.random() * roles.length)] }}</small>
          <p class="text-muted mt-3">Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>
          <ul class="list-unstyled mb-0 text-center">

            <li class="list-inline-item"><a href="javascript:void(0)" class="rounded"><i class="mdi mdi-instagram"
                  title="Instagram"></i></a></li>
            <li class="list-inline-item"><a href="javascript:void(0)" class="rounded"><i class="mdi mdi-twitter"
                  title="Twitter"></i></a></li>
            <li class="list-inline-item"><a href="javascript:void(0)" class="rounded"><i class="mdi mdi-linkedin"
                  title="Linkedin"></i></a></li>
          </ul>
          <hr>
          <div class="px-4 pb-3">

            <div class="progress-box mt-4 mt-sm-0">
              <h6 class="title text-muted">Tickets</h6>
              <div class="progress">
                <div class="progress-bar progress-bar-striped position-relative bg-primary" style="width:79%;">
                  <div class="progress-value d-block text-muted h6">79%</div>
                </div>
              </div>
            </div>

            <div class="progress-box mt-2">
              <h6 class="title text-muted">Fixes</h6>
              <div class="progress">
                <div class="progress-bar progress-bar-striped position-relative bg-primary" style="width:95%;">
                  <div class="progress-value d-block text-muted h6">95%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>





</template>

<style scoped>
.mdi {
  font-size: 1.5rem;
}

.progress-box .progress .progress-bar {
  height: 4px;
  border-radius: 10px;
  margin: auto 5px;
  -webkit-animation: animate-positive 3s;
  animation: animate-positive 3s;
  overflow: visible !important;
}

.rounded {
  border-radius: 5px !important;
}

.progress-box .title {
  font-size: 13px !important;
}

.text-muted {
  color: #8492a6 !important;
}

.progress-box .progress {
  height: 9px;
  overflow: visible;
  background: #eceef5;
}

.progress-box .progress .progress-value {
  position: absolute;
  top: -25px;
  right: -15px;
  font-size: 13px;
}
</style>