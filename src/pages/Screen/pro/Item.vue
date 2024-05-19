
<script setup>
    import "./assets/Item.css"
</script>

<template>
    <div class="screen-pro-container">
        <header>
            <h1>
                智慧管理云平台
                <span>（任务一）</span>
            </h1>
        </header>

        <section class="main">
            <div class="column">
                <div class="panel pie">
                    <h2>平均成绩分析</h2>
                    <div class="canvas canvas-one"></div>
                    <div class="panel-footer"></div>
                </div>
                <div class="panel piel">
                    <h2>任务成绩分析</h2>
                    <div class="canvas canvas-five"></div>
                    <div class="panel-footer"></div>
                </div>
            </div>
    
            <div class="column">
                <div class="panel pie">
                    <h2>小组成绩排名</h2>
                    <div class="canvas canvas-three"></div>
                    <div class="panel-footer"></div>
                </div>
                <div class="panel piel">
                    <h2>平均成绩排名</h2>
                    <div class="canvas canvas-six"></div>
                    <div class="panel-footer"></div>
                </div>
            </div>
    
            <div class="column">
                <div class="panel pie">
                    <h2>职业素养排名</h2>
                    <div class="canvas canvas-three"></div>
                    <div class="panel-footer"></div>
                </div>
                <div class="panel piel">
                    <h2>技能标兵排名</h2>
                    <div class="canvas canvas-six"></div>
                    <div class="panel-footer"></div>
                </div>
            </div>
        </section>
    </div>
</template>