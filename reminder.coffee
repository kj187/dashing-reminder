class Dashing.Reminder extends Dashing.Widget

  ready: ->
    @isActive = false
    @placeholderWidgets = $('.reminder-placeholder')

  onData: (data) ->
    gridster = $(".gridster ul").gridster().data('gridster')
    if @isActive == false and data.show == true
      @isActive = true
      $('.reminder-placeholder').each (i, widget) ->
        if widget != false
          gridster.remove_widget(widget)
      gridster.add_widget('<li class="widget-reminder-li">' + $('#widget-reminder-html').html() + '</li>', data.reminderPosition.size_x, data.reminderPosition.size_y, data.reminderPosition.col, data.reminderPosition.row)
    if @isActive == true
      if data.show == true
        $('.widget-reminder-li').html($('#widget-reminder-html').html())
        if data.effect == true
          $('div[data-id=reminder]').effect('bounce', 'slow')
      if data.show == false
        @isActive = false
        gridster.remove_widget($('.gridster li.widget-reminder-li'))
        @placeholderWidgets.each (i, widget) ->
          if widget != false
            gridster.add_widget(widget, $(widget).data('sizex'), $(widget).data('sizey'), $(widget).data('col'), $(widget).data('row'))